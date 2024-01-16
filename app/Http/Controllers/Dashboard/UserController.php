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
use App\Http\Requests\RequestIdentificationClient;
use App\Http\Requests\ResquestUserEdit;
use App\Models\Client;
use App\Models\Pays;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;


class UserController extends Controller
{
    
    private static $viewFolder = "Dashboard/Clients";
    private static $viewAdminFolder = "Dashboard/Admin";
    private static $imageFolder = "storage/datas/users/";    
    private static $imageFolderClient = "storage/datas/users/clients/";
    private static $pageId = "users";
    private static $pageSubid = "clients";
    private static $pageSubAdminid = "admin";
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
        $nb=User::where('role',"CL")->count();
        
        Inertia::share([
            'total'=>$nb
        ]);

        if (!empty($keyword)) {
            $users = User::where('role','!=','ADMIN')->where('nom', 'LIKE', "%$keyword%")
                ->orWhere('prenom', 'LIKE', "%$keyword%")
                ->orWhere('telephone', 'LIKE', "%$keyword%")
                ->orWhere('email', 'LIKE', "%$keyword%")
                ->orderBy('nom')->orderBy('prenom')
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $users = User::orderBy('nom')->orderBy('prenom')->where('role','!=','ADMIN')->orWhere('role',null)->paginate($perPage);
        }

        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'users' => $users,
            'page_title' => "Clients",
            'count' => $users->count(),
            'page_subtitle' => "Gestion des clients inscrits",
        ]);
    }
    public function indexAdmin(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10;
        $nb=User::where('role',"ADMIN")->count();
        Inertia::share([
            'total'=>$nb,
            'page_id' => self::$pageId,
            'page_subid' => self::$pageSubAdminid
        ]);

        if (!empty($keyword)) {
            $users = User::where('role','ADMIN')->where('nom', 'LIKE', "%$keyword%")
                ->orWhere('prenom', 'LIKE', "%$keyword%")
                ->orWhere('telephone', 'LIKE', "%$keyword%")
                ->orWhere('email', 'LIKE', "%$keyword%")
                ->orderBy('nom')->orderBy('prenom')
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $users = User::orderBy('nom')->orderBy('prenom')->where('role','ADMIN')->paginate($perPage);
        }

        return Inertia::render(self::$viewAdminFolder . '/Index', [
            'search_text' => $keyword,
            'users' => $users,
            'page_title' => "Clients",
            'count' => $users->count(),
            'page_subtitle' => "Gestion des clients inscrits",
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
        $voiture = User::create($data);
        $voiture->systemeSecurites()->attach($sys_sec_ids);
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.clients');
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
        $user=User::with('client')->findOrFail($id);
       
        $client=$user->client;
        //dd($client);
        $name=$user->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'user' => $user,
            'client' => $client,
            'page_title' => 'Client',
            'page_subtitle' => "Affichage de détail sur " . $name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editDossier($id)
    {
         $countries = Pays::select('nom_fr_fr', 'id')->orderBy('nom_fr_fr')->get();
         $client=Client::where('id',$id)->where('etat','!=',1)->firstOrFail();       
        Inertia::share([
            'countries' => $countries,
            'client'=>$client
        ]);
        return Inertia::render(self::$viewFolder . '/EditDossier', [
            'client'=>$client,
            'page_title' => 'Midification du dossier clien client',
            'page_subtitle' => "Modification des informations d'un dossier client ",
        ]);
    }
    public function saveDossier(RequestIdentificationClient $request,$id)
    {
        $data = $request->all();;
        $client = Client::where('id', $id)->firstOrFail();
        $exp = strlen($request->get('date_expiration_permis') !='') ? $this->converDateToDB($request->get('date_expiration_permis')) : null;
        
        $data1 = [           
            "pays_id" => $request->get('pays_id'),
            "nom" => $request->get('nom'),
            "prenom" => $request->get('prenom'),
            "sexe" => $request->get('sexe'),
            "type_piece_identite" => $request->get('type_piece_identite'),
            "numero_piece_identite" => $request->get('numero_piece_identite'),
            "date_naissance" => $this->converDateToDB($request->get('date_naissance')),
            "lieu_naissance" => ($request->get('lieu_naissance')),
            "date_expiration_permis" => $exp,
            "ville_residence" => $request->get('ville_residence'),
            "adresse" => $request->get('adresse_residence'),
            "numero_permis" => $request->get('numero_permis'),
            "nb_annee_conduite" => $request->get('nb_annee_conduite'),
        ];
        if ($request->hasFile('fichier_identite')) {
            $getSave = $this->saveFichier($request, 'fichier_identite');
            $data1["fichier_identite"] = $getSave;
        }
        if ($request->hasFile('fichier_permis')) {
            $getSave = $this->saveFichier($request, 'fichier_permis');
            $data1["fichier_permis"] = $getSave;
        }
        if ($request->hasFile('fichier_residence')) {
            $getSave = $this->saveFichier($request, 'fichier_residence');
            $data1["fichier_residence"] = $getSave;
        }
        try {
                $client->update($data1);
               
                Session::flash('success', [
                    'title' => "Mise à jour effectuée",
                    "message" => "Votre dossier client a été mise à jour avec succèss !"
                ]);
           
        } catch (\Throwable $th) {
            //throw $th;
            Session::flash('danger', [
                'title' => "Echec de l'enrégistrement",
                "message" => "La soumission de votre dossier a échouée. Veuillez rééssayer"
            ]);
            return back();
        }
        return to_route('dashboard.clients');
    }
    public function validateDossier($id){
        $client=Client::where('id',$id)->firstOrFail();
        $client->etat=true;
        $client->save();
        $user= $client->user;
        $user->etat='1';
        $user->save();
       
        Session::flash('success', [
            'title' => "Dossier validé",
            "message" => "Le dossier client a été validé avec succèss !"
        ]);
        return back();// to_route('dashboard.clients');
    }
    public function unvalidateDossier($id){
        $client=Client::where('id',$id)->firstOrFail();
        $client->etat=0;
        $client->save();
        $user= $client->user;
        $user->etat=0;
        $user->save();

        Session::flash('success', [
            'title' => "Dossier désactivé",
            "message" => "Le dossier client a été désactivé avec succèss !"
        ]);
        return back();// to_route('dashboard.clients');
    }
    public function saveFichier(Request $request, $fichier)
    {
        $nomLogo = '';
        if ($request->hasFile($fichier)) {
            $file = $request->file($fichier);
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $destinationPath = (self::$imageFolderClient);
            if (!Storage::exists($destinationPath)) {
                Storage::makeDirectory($destinationPath);
            }
            $file->move($destinationPath, $fileName);
            $nomLogo = self::$imageFolderClient . $fileName;
        }
        return $nomLogo;
    }
    public function edit($id)
    {
       $user=User::where('id',$id)->firstOrFail();       

        return Inertia::render(self::$viewFolder . '/Edit', [
            'user'=>$user,
            'page_title' => 'Midification du client',
            'page_subtitle' => "Modification des informations du compte client ",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $users = User::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'users' => $users,
            'page_title' => "users",
            'page_subtitle' => "Liste de users",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(ResquestUserEdit $request, $id)
    {
       
        $user = User::findOrFail($id);
        $data = $request->except('photo');
      
        $data=[
            'nom'=>$request->get('nom'),
            'role'=>$request->get('role'),
            'prenom'=>$request->get('prenom'),
            'telephone'=>$request->get('telephone'),
            'email'=>$request->get('email'),
        ];
        if ($request->hasFile('photo')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $pwd=$request->password;
        if(strlen($pwd)>=8){
            $data['password'] =  Hash::make($pwd);
        }
        $user->update($data);
        
        Session::flash(
            'info',
            [
                'title' => 'Mise à jour effectuée',
                'message' => 'Les données ont été modifiées avec succès!',
            ]
        );
        if($user->role=='ADMIN'){
            return to_route('dashboard.administrateurs');
        }
        return to_route('dashboard.clients');
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

        $voiture = User::findOrFail($id);
        $voiture->delete();

        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.clients');
    }
     
    public function destroyImage($imgId,$id)
    {

        if($imgId=="-1"){
            $voiture=User::where('id',$id)->firstOrFail();

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
            $v=User::where('id',$id)->firstOrFail();
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
            $voiture=User::where('id',$id)->firstOrFail();
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
            $v=User::where('id',$id)->firstOrFail();
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
