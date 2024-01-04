<?php

namespace App\Http\Controllers;

use App\Models\AvisClient;
use App\Models\Contact;
use App\Models\EnLocation;
use App\Models\EnVente;
use App\Models\Faq;
use App\Models\Marque;
use App\Models\PointRetrait;
use App\Models\WebInfo;
use App\Models\WebPage;
use Inertia\Inertia;
use App\Http\Requests\RequestContact;
use App\Models\Categorie;
use App\Models\TypeCarburant;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

class FrontController extends Controller
{
    public static $folder = "Front/";
    public static $pageCat = "location";
    public function __construct(){
        Inertia::share([
            'page_cat'=>self::$pageCat
        ]);
    }
    public function index(Request $request)
    {
        //session()->flash("danger", ["title" => "Alerte", 'message' => "Message de test de notification"]);
        $top_points= PointRetrait::whereHas('Locations')->orderBy("lieu","ASC")->take(10)->get();
        $avis_clients= AvisClient::
        where('photo','!=',null)->
        where('actif',1)->
        orderBy("auteur","ASC")->take(10)->get();
        //dd($avis_clients);
        $topMarques = Marque::withCount('voitures')->whereHas('voitures')->latest()->take(6)->get();
        $topVoituresLocation = EnLocation::where('etat',1)->with('voiture.type_carburant')
        ->with('voiture.marque')->with('voiture')->where('etat',true)->latest()->take(6)->get();
        $top_faqs = Faq::where('actif','=',1)->latest()->take(10)->get();

       
        $top_ventes=EnVente::where('en_vente',true)
        ->with('pointRetrait')
        ->with('voiture.type_carburant')
        ->with('voiture.categorie')
        ->with('voiture.medias')
        ->with('voiture.marque')
        ->with('voiture')->take(4)->get();
        
        return Inertia::render(self::$folder . 'Index', [
            'top_points' => $top_points,
            'top_marques' => $topMarques,
            'avis_clients' => $avis_clients,
            'top_locations' => $topVoituresLocation,
            'top_ventes' => $top_ventes,
           'top_faqs' => $top_faqs,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'phpVersion' => PHP_VERSION,

        ]);
    }
    public function getApropos(Request $request)
    {
        $page=WebInfo::where('code','a_propos')->first();

        return Inertia::render(self::$folder . 'Apropos',[
            'page'=>$page
        ]);
    }
    public function getContact(Request $request)
    {
        $data=[];
        return Inertia::render(self::$folder . 'Contact',[
            'data'=>$data
        ]);
    }
    
    public function postContact(RequestContact $request)
    {
        $data = $request->only([ 
            'nom_prenom',  
            'email', 
            'telephone', 
            'objet', 
            'message']);

        Contact::create($data);
        Session::flash('success',
        [
            'title'=>'Message envoyé',
            'message'=>'Nous avons transmis votre message. Notre support client vous contactera dans un bref délais. Merci pour la confiance !',
        ]
        );
        return to_route('home');
    }
    public function getMessages(Request $request)
    {
        $data=[];
        return Inertia::render(self::$folder . 'Messages',[
            'data'=>$data
        ]);
    }
    public function getFaqs(Request $request)
    {
        $data=Faq::where('actif',true)->orderBy('question')->get();
        $nb_infos=12;
        $infos=WebPage::latest()->paginate($nb_infos);
        
        $this->sharePage('aides');
        return Inertia::render(self::$folder . 'Faqs',[
            'faqs'=>$data,
            'infos'=>$infos,
        ]);
    }
    public function getSupports()
    {
        $nb_infos=24;
        $infos=WebPage::latest()->paginate($nb_infos);
        
        $this->sharePage('aides');
        return Inertia::render(self::$folder . 'Support',[
            'infos'=>$infos,
        ]);
    }
    public function getFaqInfo($id,$slug)
    {
        $page=WebPage::findOrFail($id);
        $suggestions=WebPage::where('id','!=',$id)
        ->inRandomOrder()->limit(6)->get();
        return Inertia::render(self::$folder . 'FaqInfo',[
            'page'=>$page,
            'suggestions'=>$suggestions,
        ]);
    }
   
    public function showLocation($id,Request $request)
    {
        $location = EnLocation::where('etat',1)->with('voiture')
        ->with('voiture.marque')
        ->with('voiture.categorie')
        ->with('voiture.type_carburant')
        ->with('voiture.systemeSecurites')
        ->with('voiture.locationMedias')
        ->findOrFail($id);

        $locations_suggestion= EnLocation::where('etat',1)
        ->with('voiture')->where('id','!=',$id)
        ->with('voiture.marque')
        ->with('voiture.categorie')
        ->with('voiture.type_carburant')
        ->with('voiture.systemeSecurites')
        ->with('voiture.locationMedias')
        ->inRandomOrder()->limit(9)->get();
        
        if ($location) {
            $cookieName = 'location_' . $id;
            if (!Cookie::has($cookieName)) {
                $new=((int)($location->views))+1;
                $location->update(['views'=>$new]);
                Cookie::queue($cookieName, true, 60 * 24 * 7); // Set the cookie for 7 days
            }
        }
        return Inertia::render(self::$folder . 'ShowLocation',
        [
            'location'=>$location,
            'locations_suggestion'=>$locations_suggestion,
        ]);
    }
    public function getLocations(Request $request)
    {
        $nb_page_location=10;
        $data=EnLocation::where('etat',1)
        ->with('pointsRetrait')
        ->with('voiture.type_carburant')
        ->with('voiture.locationMedias')
        ->with('voiture.marque')->with('voiture')
        ->orderBy('date_debut_location',"desc")
        ->paginate($nb_page_location);
        
        return Inertia::render(self::$folder . 'Locations',[
            'locations'=>$data
        ]);
    }
    
    public function getAchats(Request $request)
    {
        
        self::sharePage("achats");
        $keyword = $request->get('search');
        $perPage = 10;

        if (!empty($keyword)) {
            $ventes = EnVente::where('en_vente',1)->
                with('pointRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.categorie')
                ->with('voiture.medias')
                ->with('voiture.marque')
                
                ->orWhere('tarif_vente_heure', 'LIKE', "%$keyword%")
                ->orWhere('tarif_vente_hebdomadaire', 'LIKE', "%$keyword%")
                ->orWhere('tarif_vente_journalier', 'LIKE', "%$keyword%")
                ->orWhere('tarif_vente_mensuel', 'LIKE', "%$keyword%")
                ->orWhere('date_debut_vente', 'LIKE', "%$keyword%")
                ->orWhere('date_fin_vente', 'LIKE', "%$keyword%")
                ->orWhere('conditions', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->orWhereHas('voiture', function ($query) use ($keyword) {
                    $query->where('nom', 'like', "%{$keyword}%")
                        ->orWhere('description', 'like', "%{$keyword}%");
                })
                ->orWhereHas('pointRetrait', function ($query) use ($keyword) {
                    $query->where('lieu', 'like', "%{$keyword}%");
                    $query->where('wille', 'like', "%{$keyword}%");
                    //->orWhere('description', 'like', "%{$keyword}%");
                })
                ->latest()->paginate($perPage)->withQueryString();
            }else{
                $ventes=EnVente::where('en_vente',1)
                ->with('pointRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.categorie')
                ->with('voiture.medias')
                ->with('voiture.marque')
                ->with('voiture')->paginate($perPage);
            }
                
        $vente_marques=Marque::orderBy('nom')->whereHas('voitures.medias')->get();
        $vente_categories=Categorie::orderBy('nom')->whereHas('voitures.medias')->get();
        $vente_annees=Voiture::whereHas('medias')->groupBy('annee_fabrication')->orderBy('annee_fabrication')->pluck('annee_fabrication');
        $vente_carburants=TypeCarburant::orderBy('nom')->whereHas('voitures.medias')->get();
        
        return Inertia::render(self::$folder . 'Achats',[
            'en_ventes'=>$ventes,
            'vente_marques'=>$vente_marques,
            'vente_categories'=>$vente_categories,
            'vente_annees'=>$vente_annees,
            'vente_carburants'=>$vente_carburants,
        ]);
    }
    public static function sharePage($page_id){
        return Inertia::share('page_id',$page_id);
    }
    public function showAchat($id,Request $request)
    {
        self::sharePage("achats");
        $vente=EnVente::where('en_vente',1)
        ->with('voiture')
        ->with('pointRetrait')
        ->with('voiture.type_carburant')
        ->with('voiture.medias')
        ->with('voiture.categorie')
        ->with('voiture.marque')
        ->findOrFail( $id );
       
        if ($vente) {
            $cookieName = 'vente_' . $id;
            if (!Cookie::has($cookieName)) {
                $new=((int)($vente->views))+1;
                $vente->update(['views'=>$new]);
                Cookie::queue($cookieName, true, 60 * 24 * 7); // Set the cookie for 7 days
                
            }
        }
        $ventes_suggestion= EnVente::
        //where('etat',1)->
        with('voiture')->where('id','!=',$id)
        ->with('voiture.marque')
        ->with('voiture.categorie')
        ->with('voiture.type_carburant')
        ->with('voiture.systemeSecurites')
        ->with('voiture.locationMedias')
        ->inRandomOrder()->limit(9)->get();

        return Inertia::render(self::$folder . 'ShowAchat',[
            'vente'=>$vente,
            'ventes_suggestion'=>$ventes_suggestion,
        ]);
    }
   
 
    
    public function getMarques()
    {
        $nb_marques=24;
        $marques= Marque::latest()->paginate($nb_marques);
        return Inertia::render(self::$folder . 'Marques',[
            'marques'=>$marques
        ]);
    }
    public function getTermes(Request $request)
    {
        $page=WebInfo::where('code','termes_conditions')->first();
        return Inertia::render(self::$folder . 'Termes',[
            'page'=>$page
        ]);
    }
    public function getAvis(Request $request)
    {
        $nb_avisclients=10;
       
        $avis=AvisClient::where('actif',1)->latest()->paginate($nb_avisclients);
            return Inertia::render(self::$folder . 'Avis',[
            'avis'=>$avis,
        ]);
    }
    public function getServices(Request $request)
    {
        $page=WebInfo::where('code','services')->first();
        return Inertia::render(self::$folder . 'Services',[
            'page'=>$page
        ]);
    }
    public function getPanier(Request $request)
    {
        $data=[];
        return Inertia::render(self::$folder . 'Panier',[
            'data'=>$data
        ]);
    }
    public function getCatLocations(Request $request)
    {
        $data=[];
        return Inertia::render(self::$folder . 'CatLocations',[
            'data'=>$data
        ]);
    }
    public function getMarque(Request $request)
    {
        $data=[];
        return Inertia::render(self::$folder . 'Marques',[
            'data'=>$data
        ]);
    }
}
