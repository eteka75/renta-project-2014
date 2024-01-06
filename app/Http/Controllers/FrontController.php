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
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

class FrontController extends Controller
{
    public static $folder = "Front/";
    public static $pageCat = "location";
    public function __construct()
    {
        Inertia::share([
            'page_cat' => self::$pageCat
        ]);
    }
    public function index(Request $request)
    {
        //session()->flash("danger", ["title" => "Alerte", 'message' => "Message de test de notification"]);
        $top_points = PointRetrait::whereHas('Locations')->orderBy("lieu", "ASC")->take(10)->get();
        $avis_clients = AvisClient::where('photo', '!=', null)->where('actif', 1)->orderBy("auteur", "ASC")->take(10)->get();
        //dd($avis_clients);
        $topMarques = Marque::withCount('voitures')->whereHas('voitures')->latest()->take(6)->get();
        $topVoituresLocation = EnLocation::where('etat', 1)->with('voiture.type_carburant')
            ->with('voiture.marque')->with('voiture')->where('etat', true)->latest()->take(6)->get();
        $top_faqs = Faq::where('actif', '=', 1)->latest()->take(10)->get();


        $top_ventes = EnVente::where('en_vente', true)
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
        $page = WebInfo::where('code', 'a_propos')->first();

        return Inertia::render(self::$folder . 'Apropos', [
            'page' => $page
        ]);
    }
    public function getContact(Request $request)
    {
        $data = [];
        return Inertia::render(self::$folder . 'Contact', [
            'data' => $data
        ]);
    }

    public function postContact(RequestContact $request)
    {
        $data = $request->only([
            'nom_prenom',
            'email',
            'telephone',
            'objet',
            'message'
        ]);

        Contact::create($data);
        Session::flash(
            'success',
            [
                'title' => 'Message envoyé',
                'message' => 'Nous avons transmis votre message. Notre support client vous contactera dans un bref délais. Merci pour la confiance !',
            ]
        );
        return to_route('home');
    }
    public function getMessages(Request $request)
    {
        $data = [];
        return Inertia::render(self::$folder . 'Messages', [
            'data' => $data
        ]);
    }
    public function getFaqs(Request $request)
    {
        $data = Faq::where('actif', true)->orderBy('question')->get();
        $nb_infos = 12;
        $infos = WebPage::latest()->paginate($nb_infos);

        $this->sharePage('aides');
        return Inertia::render(self::$folder . 'Faqs', [
            'faqs' => $data,
            'infos' => $infos,
        ]);
    }
    public function getSupports()
    {
        $nb_infos = 24;
        $infos = WebPage::latest()->paginate($nb_infos);

        $this->sharePage('aides');
        return Inertia::render(self::$folder . 'Support', [
            'infos' => $infos,
        ]);
    }
    public function getFaqInfo($id, $slug)
    {
        $page = WebPage::findOrFail($id);
        $suggestions = WebPage::where('id', '!=', $id)
            ->inRandomOrder()->limit(6)->get();
        return Inertia::render(self::$folder . 'FaqInfo', [
            'page' => $page,
            'suggestions' => $suggestions,
        ]);
    }

    public function showLocation($id, Request $request)
    {
        $location = EnLocation::where('etat', 1)->with('voiture')
            ->with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->findOrFail($id);

        $locations_suggestion = EnLocation::where('etat', 1)
            ->with('voiture')->where('id', '!=', $id)
            ->with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->inRandomOrder()->limit(9)->get();

        if ($location) {
            $cookieName = 'location_' . $id;
            if (!Cookie::has($cookieName)) {
                $new = ((int)($location->views)) + 1;
                $location->update(['views' => $new]);
                Cookie::queue($cookieName, true, 60 * 24 * 7); // Set the cookie for 7 days
            }
        }
        $helpInfo = WebInfo::where('code', 'location_detail_aide')->first();
        return Inertia::render(
            self::$folder . 'ShowLocation',
            [
                'location' => $location,
                'locations_suggestion' => $locations_suggestion,
                'info' => $helpInfo
            ]
        );
    }
    public function getLocations(Request $request)
    {
        $nb_page_location = 2;


        $search = $request->all();
        $date_debut = $request->get('date_debut');
        $heure_debut = $request->get('heure_debut');
        $min_debut = $request->get('minute_debut');
        $date_fin = $request->get('date_fin');
        $heure_fin = $request->get('heure_fin');
        $min_fin = $request->get('minute_fin');
        $prix_min = (int)$request->get('prix_min');
        $prix_max = (int)$request->get('prix_max');
        $marque = $request->get('marque');
        $categorie = $request->get('categorie');
        $carburant = $request->get('carburant');
        $boite = $request->get('type_boite');

        //dd($carburant);
        if (!empty($date_debut) && !empty($date_fin) && $this->DateASuperieurB($date_debut, $date_fin)) {
            session()->flash("warning", [
                "title" => "Erreur de saisie",
                'message' => "Le date de début doit être inférieure à la date de fin"
            ]);
        }
        if (!empty($search)) {

            $req = EnLocation::where('etat', 1)
                ->with('pointsRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.locationMedias')
                ->with('voiture.marque')
                ->with('voiture');

            if (!empty($marque)) {
                $req = $req->whereHas('voiture.marque', function ($q) use ($marque) {
                    $q->where('id', $marque);
                });
            }

            if (!empty($boite)) {
                $req = $req->whereHas('voiture', function ($q) use ($boite) {
                    $q->where('type_transmission', 'LIKE', $boite);
                });
            }

            if (!empty($carburant)) {
                $req = $req->whereHas('voiture.type_carburant', function ($q) use ($carburant) {
                    $q->where('id', $carburant);
                });
            }

            if (!empty($categorie)) {
                $req = $req->whereHas('voiture.categorie', function ($q) use ($categorie) {
                    $q->where('id', $categorie);
                });
            }

            if (!empty($prix_min) && $prix_min > 0) {
                $req = $req->where('tarif_location_heure', ">=", $prix_min)
                    /*->orWhere('tarif_location_heure',">=",$prix_min)
                    ->orWhere('tarif_location_journalier',">=",$prix_min)
                    ->orWhere('tarif_location_hebdomadaire',">=",$prix_min)
                    ->orWhere('tarif_location_mensuel',">=",$prix_min)*/;
            }
            if (!empty($prix_max) && $prix_max > 0) {
                $req = $req->where('tarif_location_heure', "<=", $prix_max)
                    /*->orWhere('tarif_location_heure',"<=",$prix_max)
                    ->orWhere('tarif_location_journalier',"<=",$prix_max)
                    ->orWhere('tarif_location_hebdomadaire',"<=",$prix_max)
                    ->orWhere('tarif_location_mensuel',"<=",$prix_max)*/;
            }
            /*$date_start = date("Y-m-d", strtotime($date_debut));
            $date_end = date("Y-m-d", strtotime($date_fin));
            
            if ((!empty($date_fin) && $date_end) && (!empty($date_debut) && $date_start)) {
                $req = $req->whereBetween('date_fin_location',[$date_debut, $date_end]);
            }else{
                if (!empty($date_debut) && $date_start) {
                    $req = $req->where('date_debut_location', "<=", $date_start);
                }
                if (!empty($date_fin) && $date_end) {
                    $req = $req->where('date_fin_location', ">=", $date_end);
                }
            }
            */

            $data = $req->paginate($nb_page_location)->withQueryString();
        } else {
            $data = EnLocation::where('etat', 1)
                ->with('pointsRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.locationMedias')
                ->with('voiture.marque')->with('voiture')
                ->orderBy('date_debut_location', "desc")
                ->paginate($nb_page_location);;
        }

        $location_marques = Marque::orderBy('nom')->whereHas('voitures.locationMedias')->get();
        $location_categories = Categorie::orderBy('nom')->whereHas('voitures.locationMedias')->get();
        $location_annees = Voiture::whereHas('medias')->groupBy('annee_fabrication')->orderBy('annee_fabrication')->pluck('annee_fabrication');
        $location_carburants = TypeCarburant::orderBy('nom')->whereHas('voitures.locationMedias')->get();
        $location_boites = Voiture::where('type_transmission', '!=', null)->whereHas('locationMedias')->groupBy('type_transmission')->orderBy('type_transmission')->pluck('type_transmission');

        return Inertia::render(self::$folder . 'Locations', [
            'locations' => $data,
            'location_marques' => $location_marques,
            'location_categories' => $location_categories,
            'location_annees' => $location_annees,
            'location_carburants' => $location_carburants,
            'location_boites' => $location_boites,
            'search' => $search,
        ]);
    }

    function DateASuperieurB($dateA, $dateB)
    {
        // Convertir les chaînes en objets DateTime
        $date1 = DateTime::createFromFormat('d/m/Y', $dateA);
        $date2 = DateTime::createFromFormat('d/m/Y', $dateB);

        // Vérifier si la conversion a réussi
        if ($date1 === false || $date2 === false) {
            return false;
            throw new Exception('Erreur lors de la conversion des dates.');
        }
        if ($date1 > $date2) {
            return true;
        } else {
            return false;
        }
    }

    public function getAchats(Request $request)
    {

        self::sharePage("achats");
        $search = $request->all();
        $perPage = 12;
        $prix_min = (int)$request->get('prix_min');
        $prix_max = (int)$request->get('prix_max');
        $kilometre_min = (int)$request->get('kilometrage_min');
        $kilometre_max = (int)$request->get('kilometrage_max');
        $marque = $request->get('marque');
        $annee = $request->get('annee');
        $carburant = $request->get('carburant');
        $categorie = $request->get('categorie');
        $boite = $request->get('type_boite');
        if ($kilometre_max > 0 && $kilometre_min > 0 && $kilometre_max < $kilometre_min) {
            session()->flash("warning", [
                "title" => "Erreur de saisie",
                'message' => "Le kilométrage maximum doit être inférieur au minimum"
            ]);
        }
        if ($prix_max > 0 && $prix_min > 0 && $prix_max < $prix_min) {
            session()->flash("warning", [
                "title" => "Erreur de saisie",
                'message' => "Le prix maximum doit être inférieur au minimum"
            ]);
        }
        if (!empty($search)) {

            $req = EnVente::where('en_vente', 1)->with('pointRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.categorie')
                ->with('voiture.medias')
                ->with('voiture.marque')
                ->with('voiture');
            if (!empty($marque)) {
                $req = $req->whereHas('voiture.marque', function ($q) use ($marque) {
                    $q->where('id', $marque);
                });
            }
            if (!empty($annee)) {
                $req = $req->whereHas('voiture.marque', function ($q) use ($annee) {
                    $q->where('annee_fabrication', $annee);
                });
            }
            if (!empty($boite)) {
                $req = $req->whereHas('voiture', function ($q) use ($boite) {
                    $q->where('type_transmission', 'LIKE', $boite);
                });
            }
            if (!empty($carburant)) {
                $req = $req->whereHas('voiture.type_carburant', function ($q) use ($carburant) {
                    $q->where('id', $carburant);
                });
            }
            if (!empty($categorie)) {
                $req = $req->whereHas('voiture.categorie', function ($q) use ($categorie) {
                    $q->where('id', $categorie);
                });
            }
            if (!empty($kilometre_min) && $kilometre_min > 0) {
                $req = $req->where('kilometrage', ">=", $kilometre_min);
            }
            if (!empty($kilometre_max) && $prix_max > 0) {
                $req = $req->where('kilometrage', "<=", $kilometre_max);
            }
            if (!empty($prix_min) && $prix_min > 0) {
                $req = $req->where('prix_vente', ">=", $prix_min);
            }
            if (!empty($prix_max) && $prix_max > 0) {
                $req = $req->where('prix_vente', "<=", $prix_max);
            }


            $ventes = $req->paginate($perPage)->withQueryString();
        } else {
            $ventes = EnVente::where('en_vente', 1)
                ->with('pointRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.categorie')
                ->with('voiture.medias')
                ->with('voiture.marque')
                ->with('voiture')
                ->paginate($perPage);
        }
        $vente_marques = Marque::orderBy('nom')->whereHas('voitures.medias')->get();
        $vente_categories = Categorie::orderBy('nom')->whereHas('voitures.medias')->get();
        $vente_annees = Voiture::where('annee_fabrication', '!=', null)->whereHas('medias')->groupBy('annee_fabrication')->orderBy('annee_fabrication')->pluck('annee_fabrication');
        $vente_carburants = TypeCarburant::orderBy('nom')->whereHas('voitures.medias')->get();
        $vente_boites = Voiture::where('type_transmission', '!=', null)->whereHas('medias')->groupBy('type_transmission')->orderBy('type_transmission')->pluck('type_transmission');

        return Inertia::render(self::$folder . 'Achats', [
            'en_ventes' => $ventes,
            'vente_marques' => $vente_marques,
            'vente_categories' => $vente_categories,
            'vente_annees' => $vente_annees,
            'vente_carburants' => $vente_carburants,
            'vente_boites' => $vente_boites,
            'search' => $search,
        ]);
    }
    public static function sharePage($page_id)
    {
        return Inertia::share('page_id', $page_id);
    }
    public function showAchat($id, Request $request)
    {
        self::sharePage("achats");
        $vente = EnVente::where('en_vente', 1)
            ->with('voiture')
            ->with('pointRetrait')
            ->with('voiture.type_carburant')
            ->with('voiture.medias')
            ->with('voiture.categorie')
            ->with('voiture.marque')
            ->findOrFail($id);

        if ($vente) {
            $cookieName = 'vente_' . $id;
            if (!Cookie::has($cookieName)) {
                $new = ((int)($vente->views)) + 1;
                $vente->update(['views' => $new]);
                Cookie::queue($cookieName, true, 60 * 24 * 7); // Set the cookie for 7 days

            }
        }
        $ventes_suggestion = EnVente::
            //where('etat',1)->
            with('voiture')->where('id', '!=', $id)
            ->with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->inRandomOrder()->limit(9)->get();

        $helpInfo = WebInfo::where('code', 'achat_detail_aide')->first();

        return Inertia::render(self::$folder . 'ShowAchat', [
            'vente' => $vente,
            'info' => $helpInfo,
            'ventes_suggestion' => $ventes_suggestion,
        ]);
    }



    public function getMarques()
    {
        $nb_marques = 24;
        $marques = Marque::latest()->paginate($nb_marques);
        return Inertia::render(self::$folder . 'Marques', [
            'marques' => $marques
        ]);
    }
    public function getTermes(Request $request)
    {
        $page = WebInfo::where('code', 'termes_conditions')->first();
        return Inertia::render(self::$folder . 'Termes', [
            'page' => $page
        ]);
    }
    public function getAvis(Request $request)
    {
        $nb_avisclients = 10;

        $avis = AvisClient::where('actif', 1)->latest()->paginate($nb_avisclients);
        return Inertia::render(self::$folder . 'Avis', [
            'avis' => $avis,
        ]);
    }
    public function getServices(Request $request)
    {
        $page = WebInfo::where('code', 'services')->first();
        return Inertia::render(self::$folder . 'Services', [
            'page' => $page
        ]);
    }
    public function getPanier(Request $request)
    {
        $data = [];
        return Inertia::render(self::$folder . 'Panier', [
            'data' => $data
        ]);
    }
    public function getCatLocations(Request $request)
    {
        $data = [];
        return Inertia::render(self::$folder . 'CatLocations', [
            'data' => $data
        ]);
    }
    public function getMarque(Request $request)
    {
        $data = [];
        return Inertia::render(self::$folder . 'Marques', [
            'data' => $data
        ]);
    }
}
