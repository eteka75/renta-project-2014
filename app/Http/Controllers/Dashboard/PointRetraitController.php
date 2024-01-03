<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestPointRetraitRequest;
use App\Models\PointRetrait;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PointRetraitController extends Controller
{
    
    private static $viewFolder = "Dashboard/Point_retraits";
    private static $imageFolder = "storage/datas/point_retraits/";
    private static $pageId = "locations";
    private static $pageSubid = "points";
    private static $nbPerPage = 10;
    /**
     * Display a listing of the resource.
     */
    public function __construct(){
        $statics=[
            'page_id' => self::$pageId,
            'page_subid' => self::$pageSubid,
        ];
        Inertia::share($statics);
    }
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10;
        Inertia::share(['total'=>PointRetrait::count()]);

        if (!empty($keyword)) {
            $point_retraits = PointRetrait::where('ville', 'LIKE', "%$keyword%")
                ->orWhere('lieu', 'LIKE', "%$keyword%")
                ->orWhere('contacts', 'LIKE', "%$keyword%")
                ->orWhere('quartier', 'LIKE', "%$keyword%")
                ->orWhere('adresse', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $point_retraits = PointRetrait::latest()->paginate($perPage);
        }
       
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'point_retraits' => $point_retraits, 
            'count' => $point_retraits->count(), 
            'page_title' => "Points de retrait",
            'page_subtitle' => "Gestion de points de retrait de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouveau point de retrait",
            'page_subtitle' => "Ajouter un nouveau point de retrait de voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'lieu' => ["required","unique:point_retraits,lieu"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestPointRetraitRequest())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);

        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        PointRetrait::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.point_retraits');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pointRetrait=PointRetrait::where('id', $id)->firstOrFail();
        $pointRetrait_name=$pointRetrait->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'point_retrait' => $pointRetrait,
            'page_title' => "Point de retrait ".$pointRetrait_name,
            'page_subtitle' => "Affichage de détail sur ".$pointRetrait_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $pointRetrait = PointRetrait::findOrFail($id);

        return Inertia::render(self::$viewFolder . '/Edit', [
            'point_retrait' => $pointRetrait,
            'page_title' => "Edition de point de retrait",
            'page_subtitle' => "Modification d'un point de retrait",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $point_retraits = PointRetrait::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'point_retraits' => $point_retraits,
            'page_title' => "Export des points de retrait",
            'page_subtitle' => "Exportations des points de retrait de voiture",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestPointRetraitRequest $request, $id){

        $pointRetrait = PointRetrait::findOrFail($id);
        $data = $request->except('photo');
        $pointRetrait->update($data);
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        if(isset($data['photo']) && $data['photo']!=''){
            $pointRetrait->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.point_retraits');
    }

    public function saveLogo(Request $request)
    {
        $nomLogo = '';
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $destinationPath = (self::$imageFolder);
            if (!Storage::exists($destinationPath)) {
                Storage::makeDirectory($destinationPath);
            }
            $file->move($destinationPath, $fileName);
            $nomLogo = self::$imageFolder . $fileName;
        }
        return $nomLogo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $pointRetrait = PointRetrait::findOrFail($id);
        $pointRetrait->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.point_retraits');
    }
}
