<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Localisation;
use Illuminate\Http\Request;
use App\Http\Requests\RequestLocalisation;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LocalisationController extends Controller
{
    
    private static $viewFolder = "Dashboard/Localisations";
    private static $imageFolder = "storage/datas/localisations/";
    private static $page_id = "locations";
    private static $page_subid = "localisations";
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
        Inertia::share(['total'=>Localisation::count()]);

        if (!empty($keyword)) {
            $localisations = Localisation::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('ville', 'LIKE', "%$keyword%")
                ->orWhere('commune', 'LIKE', "%$keyword%")
                ->orWhere('departement', 'LIKE', "%$keyword%")
                ->orWhere('adresse', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $localisations = Localisation::latest()->paginate($perPage);
        }
        
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'localisations' => $localisations,
            'count' => $localisations->count(),
            'page_title' => "Localisation",
            'page_subtitle' => "Gestion des Localisations de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle localisation",
            'page_subtitle' => "Ajouter une nouvelle localisation",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'nom' => ["required","unique:localisations,nom"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestLocalisation())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);

        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        Localisation::create($data);

        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );

        return to_route('dashboard.localisations');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $option_vente=Localisation::where('id', $id)->firstOrFail();
        $option_vente_name=$option_vente->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'option_vente' => $option_vente,
            'page_title' => "Localisation : ".$option_vente_name,
            'page_subtitle' => "Affichage de détail sur ".$option_vente_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $option_vente = Localisation::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'option_vente' => $option_vente,
            'page_title' => "Edition de localisation",
            'page_subtitle' => "Modification d'une localisation",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $localisations = Localisation::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'localisations' => $localisations,
            'page_title' => "Localisation",
            'page_subtitle' => "Liste des Localisation",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestLocalisation $request, $id){

        $option_vente = Localisation::findOrFail($id);
        $data = $request->except('photo');
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $option_vente->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $option_vente->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.localisations');
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
        
        $option_vente = Localisation::findOrFail($id);
        $option_vente->delete();

        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.localisations');
    }
}
