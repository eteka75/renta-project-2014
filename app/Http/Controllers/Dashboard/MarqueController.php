<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestMarqueVoitureRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Marque;
use Inertia\Inertia;
use App\Models\Pays;

class MarqueController extends Controller
{
    private static $viewFolder = "Dashboard/Marques";
    private static $imageFolder = "storage/datas/marques/";
    private static $pageId = "voitures";
    private static $pageSubid = "marques";
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
        $this->middleware('auth');
    }
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total=Marque::count();
        Inertia::share(['total'=>$total]);
        
        if (!empty($keyword)) {
            $marques = Marque::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->orWhere('annee_fondation', 'LIKE', "%$keyword%")
                ->orWhere('site_web', 'LIKE', "%$keyword%")
                ->orWhere('logo', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $marques = Marque::latest()->paginate($perPage);
        }
        $count =$marques->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'marques' => $marques,
            'page_title' => "Marques",
            'page_subtitle' => "Gestion vos marques de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pays = Pays::select('nom_fr_fr', 'id')->orderBy('nom_fr_fr')->get();
        return Inertia::render(self::$viewFolder . '/Create', [
            'pays' => $pays,
            'page_title' => "Nouvelle marque",
            'page_subtitle' => "Ajouter une nouvelle marque de voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'nom' => ["required","unique:marques,nom"],
        ];


        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestMarqueVoitureRequest())->rules(), $additionalRules);

        // Validate the request
        $request->validate($rules);
        $data =  $request->except('logo');
        if($request->hasFile('logo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['logo'] = $getSave;
            }
        }
        $data['slug']= $this->generateUniqueSlug($data['nom']);
        Marque::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );

        return to_route('dashboard.marques');
    }
    private static function generateUniqueSlug($title='')
    {
        $title=$title==''?Str::random(10) : $title;
        $slug = Str::slug($title);
        $count = Marque::where('slug', $slug)->count();
        
        return $count ? "{$slug}-{$count}" : $slug;
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $marque=Marque::with('pays')->where('id', $id)->firstOrFail();
        $marque_name=$marque->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'marque' => $marque,
            'page_title' => "Marque ".$marque_name,
            'page_subtitle' => "Affichage de détail sur ".$marque_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $marque = Marque::findOrFail($id);
        $pays = Pays::select('nom_fr_fr', 'id')->orderBy('nom_fr_fr')->get();
        return Inertia::render(self::$viewFolder . '/Edit', [
            'pays' => $pays,
            'marque' => $marque,
            'page_title' => "Edition de marque",
            'page_subtitle' => "Modification d'une marque de voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $marques = Marque::with('pays')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'marques' => $marques,
            'page_title' => "Export des marques",
            'page_subtitle' => "Exportations des marques de voiture",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestMarqueVoitureRequest $request, $id){

        $marque = Marque::findOrFail($id);
        $data = $request->except("logo");
        if($request->hasFile('logo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['logo'] = $getSave;
            }
        }
        $data['slug']= $this->generateUniqueSlug($data['nom']);
        $marque->update($data);
        if(isset($data['logo']) && $data['logo']!=''){
            $marque->update([
                'logo' => $data['logo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.marques');
    }

    public function saveLogo(Request $request)
    {
        $nomLogo = '';
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
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
        
        $marque = Marque::findOrFail($id);
        $marque->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.marques');
    }
}
