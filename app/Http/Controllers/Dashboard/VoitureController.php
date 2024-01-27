<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestVoitureRequest;
use App\Models\Categorie;
use App\Models\Marque;
use App\Models\SystemeSecurite;
use App\Models\TypeCarburant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voiture;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VoitureController extends Controller
{

    private static $viewFolder = "Dashboard/Voitures";
    private static $imageFolder = "storage/datas/voitures/";
    private static $pageId = "voitures";
    private static $pageSubid = "voitures";
    private static $nbPerPage = 10;
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $statics = [
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
        Inertia::share([
            'total'=>Voiture::count()
        ]);

        if (!empty($keyword)) {
            $voitures = Voiture::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('annee_fabrication', 'LIKE', "%$keyword%")
                ->orWhere('volume_coffre', 'LIKE', "%$keyword%")
                ->orWhere('date_achat', 'LIKE', "%$keyword%")
                ->orWhere('couleur', 'LIKE', "%$keyword%")
                ->orWhere('type_transmission', 'LIKE', "%$keyword%")
                ->orWhere('dimenssions', 'LIKE', "%$keyword%")
                ->orWhere('nombre_vitesse', 'LIKE', "%$keyword%")
                ->orWhere('nombre_place', 'LIKE', "%$keyword%")
                ->orWhere('consommation', 'LIKE', "%$keyword%")
                ->orWhere('capacite_reservoir', 'LIKE', "%$keyword%")
                ->orWhere('emission_co2', 'LIKE', "%$keyword%")
                ->orWhere('type_eclairage', 'LIKE', "%$keyword%")
                ->orWhere('type_suspenssion', 'LIKE', "%$keyword%")
                ->orWhere('technologies_a_bord', 'LIKE', "%$keyword%")
                ->orWhere('puissance_moteur', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $voitures = Voiture::latest()->paginate($perPage);
        }

        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'voitures' => $voitures,
            'page_title' => "Voitures",
            'count' => $voitures->count(),
            'page_subtitle' => "Gestion voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $marques = Marque::orderBy("nom", "asc")->select('nom', 'id')->get();
        $categories = Categorie::orderBy("nom", "asc")->select('nom', 'id')->get();
        $type_carburants = TypeCarburant::orderBy("nom", "asc")->select('nom', 'id')->get();
        $sys_securites = SystemeSecurite::orderBy("nom", "asc")->select('nom', 'id')->get();
        Inertia::share([
            'marques' => $marques,
            'sys_securites' => $sys_securites,
            'categories' => $categories,
            'type_carburants' => $type_carburants
        ]);

        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle voiture",
            'page_subtitle' => "Ajouter une nouvelle voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestVoitureRequest $request)
    {
        
        $data = $request->except(['photo']);
        if ($request->hasFile('photo')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $data['date_achat'] = $this->converDateToDB($request->input('date_achat'));

        
        $sys_sec_ids = is_array($data['systeme_securites']) && count($data['systeme_securites'])?$data['systeme_securites']:[];
        if ($data['date_achat'] == null) {
            unset($data['date_achat']);
        }
        $userId = \Auth::id()??'0';
        if($userId==='0'){return back();}
        $data['user_add_id']=$userId;
        //dd($data);
        $voiture = Voiture::create($data);
        $voiture->systemeSecurites()->attach($sys_sec_ids);
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.voitures');
    }

    public function converDateToDB($date)
    {
        $dateObj = \DateTime::createFromFormat('d/m/Y', $date);
        if ($dateObj === false) {
            return false;
        }
        return $dateObj->format('Y-m-d');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $voiture = Voiture::with('systemeSecurites')
        ->with('controles')
        ->with('operations')
        ->with('categorie')
        ->with('marque')->with('type_carburant')->where('id', $id)->firstOrFail();
        
        $voiture_name = $voiture->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'voiture' => $voiture,
            'page_title' => $voiture_name,
            'page_subtitle' => "Affichage de détail sur " . $voiture_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $voiture = Voiture::with('systemeSecurites')->with('categorie')
        ->with('marque')->with('type_carburant')->findOrFail($id);
        $marques = Marque::orderBy("nom", "asc")->select('nom', 'id')->get();
        $categories = Categorie::orderBy("nom", "asc")->select('nom', 'id')->get();
        $type_carburants = TypeCarburant::orderBy("nom", "asc")->select('nom', 'id')->get();
        $sys_securites = SystemeSecurite::orderBy("nom", "asc")->select('nom', 'id')->get();
        Inertia::share([
            'sys_securites' => $sys_securites,
            'marques' => $marques,
            'categories' => $categories,
            'type_carburants' => $type_carburants
        ]);

        return Inertia::render(self::$viewFolder . '/Edit', [
            'voiture' => $voiture,
            'page_title' => "Edition de voiture",
            'page_subtitle' => "Modification d'une voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $voitures = Voiture::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'voitures' => $voitures,
            'page_title' => "Voitures",
            'page_subtitle' => "Liste de voitures",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestVoitureRequest $request, $id)
    {
       //dd($request->all());
        $voiture = Voiture::findOrFail($id);
        $data = $request->except('photo');
        if ($request->hasFile('photo')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $data['date_achat'] = $this->converDateToDB($request->input('date_achat'));
        $voiture->update($data);
        if (isset($data['photo']) && $data['photo'] != '') {
            $voiture->update([
                'photo' => $data['photo']
            ]);
        }
        $sys_sec_ids = isset($data['systeme_securites'])  && count($data['systeme_securites'])?$data['systeme_securites']:[];
        if($sys_sec_ids!=[]) {
        $voiture->systemeSecurites()->sync($sys_sec_ids);
        }else{
            $voiture->systemeSecurites()->sync([]);
        }
        Session::flash(
            'info',
            [
                'title' => 'Mise à jour effectuée',
                'message' => 'Les données ont été modifiées avec succès!',
            ]
        );
        return to_route('dashboard.voitures');
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

        $voiture = Voiture::findOrFail($id);
        $voiture->delete();

        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.voitures');
    }
     
    public function destroyImage($imgId,$id)
    {

        if($imgId=="-1"){
            $voiture=Voiture::where('id',$id)->firstOrFail();

            $img = ($voiture->photo);
            $delete=$this->deleteImageIfExists($img);
            //if($delete==true){
                $voiture->photo='';
                $voiture->save();
                Session::flash(
                    'info',
                    [
                        'title' => 'Suppression effectuée',
                        'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
                    ]
                );
            //}
            //
        }else{
            $v=Voiture::where('id',$id)->firstOrFail();
            $media= $v->medias()->where('voiture_id',$imgId)->first();//->where('media_id',$img)->get();
            if($media!=null){
                $img = ($media->url);
                $delete=$this->deleteImageIfExists($img);
                //dd($delete);
             // if($delete==true){
                $v->medias()->detach($imgId);
                Session::flash(
                    'warning',
                    [
                        'title' => 'Suppression effectuée',
                        'message' => "La Suppression de l'image a été effectuée avec succès!",
                    ]
                );
             // }
            }
           //$voiture-> 
        }
        //dd($img,$id);
      return back();

    }
    public function destroyLocationImage($imgId,$id)
    {        
        if($imgId=="-1"){
            $voiture=Voiture::where('id',$id)->firstOrFail();
            $img = ($voiture->photo);
            $delete=$this->deleteImageIfExists($img);
            //if($delete==true){
                $voiture->photo='';
                $voiture->save();
                Session::flash(
                    'info',
                    [
                        'title' => 'Suppression effectuée',
                        'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
                    ]
                );
            //}
        }else{
            $v=Voiture::where('id',$id)->firstOrFail();
            $media= $v->locationMedias()->where('voiture_id',$imgId)->first();
            if($media!=null){
                $img = ($media->url);
                $delete=$this->deleteImageIfExists($img);
             // if($delete==true){
                $v->locationMedias()->detach($imgId);
                Session::flash(
                    'warning',
                    [
                        'title' => 'Suppression effectuée',
                        'message' => "La Suppression de l'image a été effectuée avec succès!",
                    ]
                );
             // }
            }
        }
      return back();

    }

    function deleteImageIfExists($filePath) {
        if (file_exists($filePath)) {
            if (unlink($filePath)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
