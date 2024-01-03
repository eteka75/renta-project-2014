<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestOptionVente;
use App\Http\Requests\RequestOptionVenteRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\OptionVente;
use Inertia\Inertia;

class OptionVenteController extends Controller
{
   
    
    private static $viewFolder = "Dashboard/OptionsVente";
    private static $imageFolder = "storage/datas/option_ventes/";
    private static $page_id = "ventes";
    private static $page_subid = "options_vente";
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
        Inertia::share(['total'=>OptionVente::count()]);

        if (!empty($keyword)) {
            $option_ventes = OptionVente::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('prix', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $option_ventes = OptionVente::latest()->paginate($perPage);
        }
        
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'option_ventes' => $option_ventes,
            'count' => $option_ventes->count(),
            'page_title' => "Options de vente",
            'page_subtitle' => "Gestion des options de ventes de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle option de vente",
            'page_subtitle' => "Ajouter une nouvelle option de vente",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'nom' => ["required","unique:option_ventes,nom"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestOptionVente())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);

        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        OptionVente::create($data);

        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );

        return to_route('dashboard.option_ventes');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $option_vente=OptionVente::where('id', $id)->firstOrFail();
        $option_vente_name=$option_vente->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'option_vente' => $option_vente,
            'page_title' => "Options de vente : ".$option_vente_name,
            'page_subtitle' => "Affichage de détail sur ".$option_vente_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $option_vente = OptionVente::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'sys_securite' => $option_vente,
            'page_title' => "Edition d'option de vente",
            'page_subtitle' => "Modification d'une option de vente",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $option_ventes = OptionVente::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'option_ventes' => $option_ventes,
            'page_title' => "Options de vente",
            'page_subtitle' => "Liste des options de vente",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestOptionVente $request, $id){

        $option_vente = OptionVente::findOrFail($id);
        $data = $request->except('photo');
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $option_vente->update([
            'nom' => $data['nom'],
            'description' => $data['description']
        ]);
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
        return to_route('dashboard.option_ventes');
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
        
        $option_vente = OptionVente::findOrFail($id);
        $option_vente->delete();

        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.option_ventes');
    }
}
