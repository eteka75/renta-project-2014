<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestSystemeSecuriteRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Models\SystemeSecurite; 
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SystemeSecuriteController extends Controller
{
    
    private static $viewFolder = "Dashboard/Securites";
    private static $imageFolder = "storage/datas/systeme_securites/";
    private static $page_id = "voitures";
    private static $page_subid = "sys_securites";
    private static $nbPerPage = 10;
    /**
     * Display a listing of the resource.
     */
    public function __construct(){
        $statics=[
            'page_id' => self::$page_id,
            'page_subid' => self::$page_subid,
        ];
        Inertia::share($statics);
    }
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10;
        Inertia::share(['total'=>SystemeSecurite::count()]);

        if (!empty($keyword)) {
            $sys_securites = SystemeSecurite::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $sys_securites = SystemeSecurite::latest()->paginate($perPage);
        }
        
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'sys_securites' => $sys_securites,
            'count' => $sys_securites->count(),
            'page_title' => "Systèmes de sécurité",
            'page_subtitle' => "Gestion des systèmes de sécurité",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouveau système de sécurité",
            'page_subtitle' => "Ajouter un nouveau système de sécurité",
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
        $rules = array_merge((new RequestSystemeSecuriteRequest())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);

        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        SystemeSecurite::create($data);

        return to_route('dashboard.sys_securites');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sys_securite=SystemeSecurite::where('id', $id)->firstOrFail();
        $sys_securite_name=$sys_securite->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'sys_securite' => $sys_securite,
            'page_title' => "Système de sécurité  ".$sys_securite_name,
            'page_subtitle' => "Affichage de détail sur ".$sys_securite_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $sys_securite = SystemeSecurite::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'sys_securite' => $sys_securite,
            'page_title' => "Edition de système de sécurité",
            'page_subtitle' => "Modification d'un système de sécurité",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $sys_securites = SystemeSecurite::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'sys_securites' => $sys_securites,
            'page_title' => "Systèmes de sécurité",
            'page_subtitle' => "Liste des systèmes de sécurité",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestSystemeSecuriteRequest $request, $id){

        $sys_securite = SystemeSecurite::findOrFail($id);
        $data = $request->except('photo');
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $sys_securite->update([
            'nom' => $data['nom'],
            'description' => $data['description']
        ]);
        if(isset($data['photo']) && $data['photo']!=''){
            $sys_securite->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.sys_securites');
    }

    public function saveLogo(FormRequest $request)
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
        
        $sys_securite = SystemeSecurite::findOrFail($id);
        $sys_securite->delete();

        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.sys_securites');
    }
}
