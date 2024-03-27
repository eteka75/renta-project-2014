<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestAvisClient;
use App\Models\AvisClient;
use App\Http\Requests\RequestMarqueCategorieRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Categorie;
use Inertia\Inertia;

class AvisClientController extends Controller
{
   
    private static $viewFolder = "Dashboard/AvisClients";
    private static $imageFolder = "storage/datas/avis_clients/";
    private static $pageId = "support";
    private static $pageSubid = "avis";
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
        Inertia::share(['total'=>AvisClient::count()]);

        if (!empty($keyword)) {
            $avis_clients = AvisClient::where('auteur', 'LIKE', "%$keyword%")
                ->orWhere('message', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $avis_clients = AvisClient::latest()->paginate($perPage);
        }
       
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'avis_clients' => $avis_clients, 
            'count' => $avis_clients->count(), 
            'page_title' => "Avis clients",
            'page_subtitle' => "Gestion des avis clients",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvel avis client",
            'page_subtitle' => "Ajouter une nouvelle avis client",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'auteur' => ["required","unique:avis_clients,auteur"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestAvisClient())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);
       //dd($request->all());
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        AvisClient::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.avis_clients');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $avis_client=AvisClient::where('id', $id)->firstOrFail();
        $avis_client_name=$avis_client->auteur;
        return Inertia::render(self::$viewFolder . '/Show', [
            'avis_client' => $avis_client,
            'page_title' => "Avis : ".$avis_client_name,
            'page_subtitle' => "Affichage de détail sur ".$avis_client_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $avis_client = AvisClient::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'avis_client' => $avis_client,
            'page_title' => "Edition d'un avis clients",
            'page_subtitle' => "Modification d'un avis clients",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $avis_clients = AvisClient::orderBy('actif','DESC')->orderBy('nombre_etoile','ASC')->get();
       
        return Inertia::render(self::$viewFolder . '/Export', [
            'avis_clients' => $avis_clients,
            'page_title' => "Liste des avis clients",
            'page_subtitle' => "Exportations des avis clients",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestAvisClient $request, $id){
        
        $avis_client = AvisClient::findOrFail($id);
        $data = $request->except('photo');
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $avis_client->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $avis_client->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.avis_clients');
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
        
        $avis_client = AvisClient::findOrFail($id);
        $avis_client->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.avis_clients');
    }
}
