<?php

namespace App\Http\Controllers;

use App\Http\Middleware\setOrCheckReservationCode;
use App\Http\Requests\RequestAddRemoveFavoris;
use App\Http\Requests\RequestCommandeStep1;
use App\Models\AvisClient;
use App\Models\Contact;
use App\Models\EnLocation;
use Illuminate\Support\Str;
use App\Models\EnVente;
use App\Models\Faq;
use App\Models\Marque;
use App\Models\PointRetrait;
use App\Models\WebInfo;
use App\Models\WebPage;
use Inertia\Inertia;
use App\Http\Requests\RequestContact;
use App\Models\Categorie;
use App\Models\Client;
use App\Models\Favori;
use App\Models\Localisation;
use App\Models\Pays;
use App\Models\Reservation;
use App\Models\TarifManager;
use App\Models\Transaction;
use App\Models\TypeCarburant;
use App\Models\Voiture;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
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
        $topMarques = Marque::orderBy('nom')->withCount('voitures')->whereHas('voitures')->latest()->take(6)->get();
        $top_faqs = Faq::where('actif', '=', 1)->latest()->take(12)->get();
        $topVoituresLocation = EnLocation::orderBy('updated_at', 'DESC')
            ->where('etat', 1)
            ->with('pointsRetrait')
            ->with('voiture.type_carburant')
            ->with('voiture.marque')
            ->with('voiture')
            ->where('etat', true)
            ->latest()->take(12)->get();


        $top_ventes = EnVente::orderBy('updated_at', 'DESC')->where('en_vente', true)
            ->with('pointRetrait')
            ->with('voiture.type_carburant')
            ->with('voiture.categorie')
            ->with('voiture.medias')
            ->with('voiture.marque')
            ->with('voiture')->take(12)->get();

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

    public function getRervationLocation($code, Request $request)
    {
        $reservation = Reservation::where('code_reservation', $code)
            ->with('PointRetrait')->with('location')->firstOrFail();
        $transaction = Transaction::where('code_reservation', $code)->firstOrFail();
        $voiture = $reservation->voiture;

        $entete = WebInfo::where('code', 'entete_facture')->first();
        // dd($reservation);
        return Inertia::render(self::$folder . 'GetLocationReserve', [
            'transaction' => $transaction,
            'reservation' => $reservation,
            'voiture' => $voiture,
            'entete' => $entete,
        ]);
    }
    public function getSearchLocation(Request $request)
    {
        $nb_limite_locals = 12;
        $nb_locations = 12;
        $search = $request->all();
        $lieu = $request->get('lieu');
        if (empty($lieu)) {
            return;
        }
        $first_ville = Localisation::where('nom', 'LIKE', "$lieu%")->first();

        $local = Localisation::where('nom', 'LIKE', "%$lieu%")
            ->orWhere('ville', 'LIKE', "%$lieu%")
            ->orWhere('commune', 'LIKE', "%$lieu%")
            ->orWhere('departement', 'LIKE', "%$lieu%")
            ->orWhere('adresse', 'LIKE', "%$lieu%")
            ->orWhere('description', 'LIKE', "%$lieu%")->select('nom', 'id')->get();
        $local_ids = [];
        foreach ($local as $l) {
            $local_ids[] = $l->id;
        }

        $locals = Localisation::WhereHas('locations')->where('photo', '!=', null)->inRandomOrder();
        if ($first_ville != null && $first_ville->id) {
            $locals = $locals->where('id', '!=', $first_ville->id);
        }
        $locals = $locals->limit($nb_limite_locals)->get();
        $locations = EnLocation::where('etat', 1)->with('voiture')
            ->with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->with('pointsRetrait')
            ->WhereHas('localisations', function ($query) use ($lieu, $local_ids) {
                if (count($local_ids) > 0) {
                    $query->whereIn('id',  $local_ids);
                } else {
                    $query->where('nom', 'like', "%{$lieu}%");
                    $query->orWhere('ville', 'like', "%{$lieu}%");
                    $query->orWhere('description', 'like', "%{$lieu}%");
                }
            })
            ->paginate($nb_locations)->withQueryString();

        return Inertia::render(self::$folder . 'SearchLocation', [
            'search' => $search,
            'local' => $local,
            'first_ville' => $first_ville,
            'locals' => $locals,
            'locations' => $locations,
            'page_title' => "Recherche de location de voitures"
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
    public function addFavoris(Request $request)
    {
        $requestAddRemoveFavoris = new RequestAddRemoveFavoris();

        $request->validate($requestAddRemoveFavoris->rules());

        $u_id = Auth::user() ? Auth::user()->id : null;
        $type = $request->get('type');
        if ($type == 'ACHAT') {
            $id = $request->get('achat_id');
            $achat = Favori::where('achat_id', $id)->where('user_id', $u_id)->get();
            $nb = $achat ? $achat->count() : 0;
            if ($nb > 0) {
                Session::flash('warning', [
                    'title' => "Erreur d'ajout aux favoris",
                    "message" => "Cette voiture en location existe déjà dans vos favoris"
                ]);
                return back();
            } else {
                Favori::create([
                    'achat_id' => $id,
                    'type' => "ACHAT",
                    'user_id' => $u_id
                ]);

                Session::flash('success', [
                    'title' => "Ajout aux favoris",
                    "message" => "Cette voiture a été ajouté aux favoris avec succèss !"
                ]);
                //dd($v);
                return back();
            }
        }
        if ($type == 'LOCATION') {
            $id = $request->get('location_id');
            $loca = Favori::where('location_id', $id)->where('user_id', $u_id)->get();
            $nb = $loca ? $loca->count() : 0;
            if ($nb > 0) {
                Session::flash('warning', [
                    'title' => "Erreur d'ajout aux favoris",
                    "message" => "Cette voiture en location existe déjà dans vos favoris"
                ]);
            } else {
                Favori::create([
                    'location_id' => $id,
                    'type' => "LOCATION",
                    'user_id' => $u_id
                ]);
                Session::flash('success', [
                    'title' => "Ajout aux favoris",
                    "message" => "Cette voiture a été ajouté aux favoris avec succèss !"
                ]);
            }
        }
        return back();
    }
    public function removeFavoris(Request $request)
    {
        $requestAddRemoveFavoris = new RequestAddRemoveFavoris();

        $request->validate($requestAddRemoveFavoris->rules());

        $u_id = Auth::user() ? Auth::user()->id : null;
        $type = $request->get('type');
        if ($type == 'ACHAT') {
            $id = $request->get('achat_id');
            $achat = Favori::where('achat_id', $id)->where('user_id', $u_id)->first();
            $nb = $achat ? $achat->count() : 0;

            if ($nb > 0) {
                $achat->delete();
                Session::flash('info', [
                    'title' => "Favoris",
                    "message" => "Cette voiture a été retirée des favoris avec succèss !"
                ]);
            }
            return back();
        }
        if ($type == 'LOCATION') {
            $id = $request->get('location_id');
            $achat = Favori::where('location_id', $id)->where('user_id', $u_id)->first();
            $nb = $achat ? $achat->count() : 0;
            if ($nb > 0) {
                $achat->delete();
                Session::flash('info', [
                    'title' => "Favoris",
                    "message" => "Cette voiture a été retirée des favoris avec succèss !"
                ]);
            }
        }
        return back();
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

        $nom = $request->input('nom_prenom');
        $tel = $request->input('telephone');
        $email = $request->input('email');
        $objet = $request->input('objet');
        $message = $request->input('message');
        $signature = "\nRENTAL CAR SERVICES -  BENIN 
        \n";
        $url = "https://rentalcarservices-benin.com";
        // Formater le contenu du courriel
        $titre1 = "NOUVEAU MESSAGE DU FORMULAIRE CONTACT\n\n";
        $titre2 = "VOTRE MESSAGE ENVOYÉ  SUR LE FORMULAIRE CONTACT DE LA PLATEFORME - DCUS:\n\n";
        $contenuCourriel = "Nom et prénom(s): $nom\n";
        $contenuCourriel .= "Email: $email\n";
        $contenuCourriel .= "Objet: $objet\n\n";
        $contenuCourriel .= "Message:\n$message\n\n";
        $contenuCourriel .= "______________________________________________________________________________________________\n$signature";
        $contenuCourriel .= "$url\n";
        $msg_admin = $titre1 . "" . $contenuCourriel;
        $msg_user = $titre2 . "" . $contenuCourriel;
        // Envoyer le courriel à l'administrateur
        Mail::raw($msg_admin, function ($message) {
            $message->to('etekawilfried@gmail.com')->subject('Nouveau message du formulaire contact');
            //$message->to('support@rentalcarservices-benin.com"')->subject('Nouveau message du formulaire contact');
        });

        // Envoyer une réponse à l'utilisateur
        // Vous pouvez personnaliser le contenu du courriel et le destinataire en fonction de vos besoins
        Mail::raw($msg_user, function ($message) use ($email) {
            $message->to($email)->subject('Confirmation de réception du formulaire');
        });
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
        $nb_page_location = 16;


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
        $this->checkDatesValide($date_debut, $date_fin);
        if (!empty($search)) {

            $req = EnLocation::latest()->where('etat', 1)
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

    public function DateASuperieurB($dateA, $dateB, $format = "Y-m-d H:i")
    {

        // Convertir les chaînes en objets DateTime
        if ($format == 'Y-m-d H:i') {
            $date1 = DateTime::createFromFormat('Y-m-d H:i', $dateA);
            $date2 = DateTime::createFromFormat('Y-m-d H:i', $dateB);
        } elseif ($format == 'd/m/Y') {
            $date1 = DateTime::createFromFormat('d/m/Y', $dateA);
            $date2 = DateTime::createFromFormat('d/m/Y', $dateB);
        } elseif ($format == 'd/m/Y H:i') {
            // Correction : supprimer l'espace supplémentaire dans le deuxième format
            $date1 = DateTime::createFromFormat('d/m/Y H:i', $dateA);
            $date2 = DateTime::createFromFormat('d/m/Y H:i', $dateB);
        }
        // Vérifier si la conversion a réussi
        if ($date1 === false || $date2 === false) {
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

            $req = EnVente::latest()->where('en_vente', 1)->with('pointRetrait')
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
            $ventes = EnVente::orderBy('updated_at', 'DESC')->orderBy('created_at', 'DESC')->where('en_vente', 1)
                ->with('pointRetrait')
                ->with('voiture.type_carburant')
                ->with('voiture.categorie')
                ->with('voiture.medias')
                ->with('voiture.marque')
                ->with('voiture')
                ->paginate($perPage);
        }
        $vente_marques = Marque::orderBy('nom')->with('voitures')->whereHas('voitures.medias')->get();
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
        $marques = Marque::whereHas('voitures')->orderBy('nom')->paginate($nb_marques);

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
    public function getPanier()
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
    public function getMarque($id)
    {
        $nb_marques = 12;
        $marque = Marque::findOrFail($id);
        $marques = Marque::inRandomOrder()->where('id', '!=', $id)
            ->whereHas('voitures')->latest()->paginate($nb_marques);

        $req = EnLocation::orderBy('updated_at', 'DESC')
            ->where('etat', 1)
            ->with('voiture.type_carburant')
            ->with('voiture.marque')->with('voiture');
        if (!empty($id)) {
            $req = $req->whereHas('voiture.marque', function ($q) use ($id) {
                $q->where('id', $id);
            });
        }
        $locations = $req->take(12)->get();


        $req = EnVente::orderBy('updated_at', 'DESC')->where('en_vente', true)
            ->with('pointRetrait')
            ->with('voiture.type_carburant')
            ->with('voiture.categorie')
            ->with('voiture.medias')
            ->with('voiture.marque')
            ->with('voiture');
        if (!empty($id)) {
            $req = $req->whereHas('voiture.marque', function ($q) use ($id) {
                $q->where('id', $id);
            });
        }
        $ventes = $req->take(12)->get();
        return Inertia::render(self::$folder . 'Marque', [
            'marque' => $marque,
            'marques' => $marques,
            'locations' => $locations,
            'ventes' => $ventes,
        ]);
    }
    public function getMarqueLocations($id)
    {
        $nb_marques = 24;
        $marque = Marque::findOrFail($id);
        $marques = Marque::inRandomOrder()->where('id', '!=', $id)->whereHas('voitures')->latest()->paginate($nb_marques);
        $page_title = "Les voitures de la marque " . $marque->nom;

        $req = EnLocation::orderBy('updated_at', 'DESC')
            ->where('etat', 1)
            ->with('voiture.type_carburant')
            ->with('voiture.marque')->with('voiture');
        if (!empty($id)) {
            $req = $req->whereHas('voiture.marque', function ($q) use ($id) {
                $q->where('id', $id);
            });
        }
        $locations = $req->paginate(12);
        return Inertia::render(self::$folder . 'MarqueLocations', [
            'marques' => $marques,
            'marque' => $marque,
            'page_title' => $page_title,
            'locations' => $locations
        ]);
    }
    public function getMarqueAchats($id)
    {
        $nb_marques = 24;
        self::sharePage("achats");
        $marque = Marque::findOrFail($id);
        $marques = Marque::inRandomOrder()->where('id', '!=', $id)->whereHas('voitures')->latest()->paginate($nb_marques);
        $page_title = "Les voitures de la marque " . $marque->nom;
        $req = EnVente::orderBy('updated_at', 'DESC')->where('en_vente', true)
            ->with('pointRetrait')
            ->with('voiture.type_carburant')
            ->with('voiture.categorie')
            ->with('voiture.medias')
            ->with('voiture.marque')
            ->with('voiture');
        if (!empty($id)) {
            $req = $req->whereHas('voiture.marque', function ($q) use ($id) {
                $q->where('id', $id);
            });
        }
        $ventes = $req->paginate(12);
        return Inertia::render(self::$folder . 'MarqueAchats', [
            'marque' => $marque,
            'marques' => $marques,
            'page_title' => $page_title,
            'ventes' => $ventes
        ]);
    }

    public function checkCommandeLocation1($id, Request $request)
    {
        $code = $request->cookie('r_code');

        $data = $request->all();
        $data['code'] = $code;
        if ($code) {
            return redirect()->away(route('front.ccommande1', $data));
        } else {
            return back();
        }
    }
    function getCommandeAchat1 (Request $request){
        
    }
    public function getCommandeLocation1($code, Request $request)
    {

        $getCookieCode = $this->getCookie($request, 'r_code');
        if ($getCookieCode != $code) {
            abort(404);
        }
        $countries = Pays::select('nom_fr_fr', 'id')->orderBy('nom_fr_fr')->get();
        Inertia::share(['countries' => $countries]);
        $client = Auth::user() ? Auth::user()->client : null;
        $date_debut = $request->get('date_debut');
        $date_fin = $request->get('date_fin');

        $date_valide = $this->checkDatesValide($date_debut, $date_fin);
        $location_id = $request->get('location_id');
        // dd($location_id);
        $location = EnLocation::with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->with('pointsRetrait')
            // ->where('etat',0)
            ->findOrFail($location_id);
        $points = $location->pointsRetrait()->get();
        $voiture = $location->voiture()->get();

        //dd($points);
        $montant_minimum = TarifManager::getMtMinLocation();
        $mt = (int)TarifManager::calculerMontantLocation(
            $date_debut,
            $date_fin,
            $location->tarif_location_heure,
            $location->tarif_location_journalier,
            $location->tarif_location_hebdomadaire,
            $location->tarif_location_mensuel,
        );
        if ($mt < $montant_minimum) {
            abort(404);
        }
        $taxe = 0;
        $total = $mt + $taxe;
        //dd($date_valide);
        return Inertia::render(self::$folder . 'CommandeLocation/Step1', [

            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'location_id' => $location_id,
            'montant' => $mt,
            'client' => $client,
            'location' => $location,
            'points' => $points,
            'mtaxe' => 0,
            'mtotal' => $total,
            'voiture' => $voiture,
            'date_valide' => $date_valide,
        ]);
    }
    function checkDatesValide($date_debut, $date_fin)
    {
        $valide = true;
        $today = date('Y-m-d H:i', time());
        $today = date('Y-m-d H:i', strtotime($today . ' +3 hours'));

        if ($this->DateASuperieurB($today, $date_debut)) {
            session()->flash("warning", [
                "title" => "Erreur de date",
                'message' => "La date de début de la location doit être supérieure à la date actuelle. Prévoir une 1 à 2 heures pour permettre la mise à disposition du véhicule."
            ]);

            $valide = false;
        }
        if ($this->DateASuperieurB($date_debut, $date_fin)) {
            session()->flash("warning", [
                "title" => "Erreur de date",
                'message' => "La date de début de la location doit être inférieure à la date de fin"
            ]);
            $valide = false;
        }
        return $valide;
    }

    public function postCommandeLocation1(RequestCommandeStep1 $request)
    {
        $getUID = $this->getCookie($request, 'r_code');
        if ($getUID == null || strlen($getUID) < 8) {
            Session::flash('warning', [
                'title' => "Session exiprée",
                "message" => "Veuillez reprendre le processus à nouveau"
            ]);
            return back();
        }
        $uid = Auth::user() ? Auth::user()->id : 0;

        if (Auth::user()->etat !== true) {
            Session::flash('warning', [
                'title' => "Validation de compte nécessaire",
                "message" => "Afin de vous offrir un service adéquat et pour éviter les fraudes, nous procédons à la validation des comptes clients dans les 48heures"
            ]);
            return back();
        }
        $date_debut = $request->get('date_debut');
        $date_fin = $request->get('date_fin');
        if ($this->checkDatesValide($date_debut, $date_fin) != true) {
            Session::flash('warning', [
                'title' => "Date invalide",
                "message" => "Une ou plusieurs dates ne sont pas valident. Veuillez réessayer..."
            ]);

            return back();
        }


        $existeClient = Client::where('user_id', $uid)->first();
        $exp = strlen($request->get('date_expiration_permis') > 8) ? $this->converDateToDB($request->get('date_expiration_permis')) : null;
        if ($existeClient == null && $uid > 0) {
            $data1 = [
                "user_id" => $uid,
                "pays_id" => $request->get('pays_id'),
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
            //Client::create($data1);
        }
        $location_id = trim($request->get('location_id'));
        $lv = EnLocation::with('voiture')->where('id', $location_id)
            ->with('voiture.marque')
            ->with('voiture.categorie')
            ->with('voiture.type_carburant')
            ->with('voiture.systemeSecurites')
            ->with('voiture.locationMedias')
            ->with('pointsRetrait')
            ->WhereHas('localisations')->firstOrFail();
        $vid = $lv->voiture ? $lv->voiture->id : 0;

        /* if (Carbon::parse($date_debut)->isBefore(Carbon::now()) || Carbon::parse($date_fin)->isBefore(Carbon::now())) {
            Session::flash('warning', [
                'title' => "Erreur de date",
                "message" => "La date de début doit être supérieure à la date actuelle. Veuillez réessayer !"
            ]);
            return back();
            //return response()->json(['error' => 'Dates cannot be earlier than today'], 400);
        }
        
        // Check if the end date is greater than the start date
        if (Carbon::parse($date_fin)->isBefore(Carbon::parse($date_debut))) {
            Session::flash('warning', [
                'title' => "Erreur de date",
                "message" => "La date de fin doit être supérieure à la date de début. Veuillez réessayer.  !"
            ]);
            return back();
        }*/

        $montant = (int)TarifManager::calculerMontantLocation(
            $date_debut,
            $date_fin,
            $lv->tarif_location_heure,
            $lv->tarif_location_journalier,
            $lv->tarif_location_hebdomadaire,
            $lv->tarif_location_mensuel,
        );
        $tva = 0;
        $data2 = [
            "code_reservation" => $getUID,
            "user_id" => $uid,
            "location_id" => $location_id,
            "voiture_id" => $request->get('voiture_id'),
            "point_id" => $request->get('point_retrait_id'),
            "location" => json_encode($lv),
            "nom" => $request->get('nom'),
            "prenom" => $request->get('prenom'),
            "pays_id" => $request->get('pays_id'),
            "voiture_id" => $vid,
            "date_debut" => $request->get('date_debut'),
            "date_fin" => $request->get('date_fin'),
            "email" => $request->get('email'),
            "tva" => $tva,
            "telephone" => $request->get('telephone'),
            "type_piece_identite" => $request->get('type_piece_identite'),
            "numero_piece_identite" => $request->get('numero_piece_identite'),
            "date_naissance" => $this->converDateToDB($request->get('date_naissance')),
            "lieu_naissance" => ($request->get('lieu_naissance')),
            "date_expiration_permis" => $exp,
            "ville_residence" => $request->get('ville_residence'),
            "adresse_residence" => $request->get('adresse_residence'),
            "numero_permis" => $request->get('numero_permis'),
            "montant" => $montant,
            "nb_annee_conduite" => $request->get('nb_annee_conduite'),

        ];
        //dd($data2);
        $r = Reservation::where('code_reservation', $getUID)->first();

        try {
            if ($r === null) {
                $r = Reservation::create($data2);
            } else {
                $r->update($data2);
            }
            if ($r) {
                return Redirect::route('front.lcommande2', ['id' => $r->id]);
            }
        } catch (\Exception $e) {
            //dd($e);
            Session::flash('warning', [
                'title' => "Erreur d'enrégistrement",
                "message" => "Une erreur est survenue au court de l'enrégistrement, veuillez réessayer !"
            ]);
            return back()->with(['error' => $e->getMessage()]);
        }
    }
    public function getCommandeLocation2(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)->first(); //->where('etat','!=',true)
        $code_valide = true;
        if ($reservation) {
            if ($reservation->etat == 1) {
                Session::flash('warning', [
                    'title' => "Oups !",
                    "message" => "Cette transaction a déjà été validée ou expérée. Veuillez reprendre le processus à nouveau"
                ]);
                //Delete cookie
                if (Cookie::has('r_code')) {
                    Cookie::forget('r_code');
                    Cookie::forget('r_data');
                }
                $code_valide = false;
                return to_route('home');
            }
        }
        $getUID = $this->getCookie($request, 'r_code');

        if ($getUID == null || strlen($getUID) < 8) {
            $code_valide = false;
            Session::flash('warning', [
                'title' => "Session exiprée",
                "message" => "Veuillez reprendre le processus à nouveau"
            ]);
            if ($reservation) {
                $r = $reservation->transactions()->first();
                if ($r) {
                    return to_route('front.lcommande3', ['id' => $r->id]);
                }
            }
            return to_route('home');
        }
        $taxe = 0;
        $date_debut = $reservation->date_debut;
        $date_fin = $reservation->date_debut;
        $location_id = $reservation->location_id;
        $total = $reservation->montant + $taxe;
        $montant = $reservation->montant;
        $voiture = $reservation->voiture()->get()->first();
        $points = $reservation->pointRetrait()->get();
        $location = $reservation->location()->get()->first();

        return Inertia::render(self::$folder . 'CommandeLocation/Step2', [
            'date_debut' => $date_debut,
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'location_id' => $location_id,
            'reservation' => $reservation,
            'reservation_id' => $id,
            'montant' => $montant,
            'location' => $location,
            'points' => $points,
            'mtaxe' => $taxe,
            'mtotal' => $total,
            'voiture' => $voiture,
            'code_valide' => $code_valide,
        ]);
    }
    public function postCommandeLocation2(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)->first(); //->where('etat','!=',true)
        $code = null;
        $montant = 0;
        $vid = rand(99999, 999999999999);
        if ($reservation) {
            if ($reservation->etat == 1) {
                Session::flash('warning', [
                    'title' => "Oups !",
                    "message" => "Cette transaction a déjà été validée ou expérée. Veuillez reprendre le processus à nouveau"
                ]);
                //Delete cookie
                if (Cookie::has('r_code')) {
                    Cookie::forget('r_code');
                    Cookie::forget('r_data');
                }
                return to_route('home');
            }
            $code = $reservation->code_reservation;
            $vid = $reservation->voiture_id;
        }
        $type = 'L';
        $uid = Auth::user() ? Auth::user()->id : 0;
        $data_transaction = $request->get('transaction');
        $raison = $request->get('reason');
        $etat = $raison == "CHECKOUT COMPLETE" ? 1 : 0;
        $montant = $data_transaction['amount'] ? $data_transaction['amount'] : 0;
        $fees = $data_transaction['fees'] ? $data_transaction['fees'] : 0;
        //dd($data_transaction);
        $ttransaction = (serialize($data_transaction));
        $data1 = [
            'reservation_id' => $request->reservation_id,
            'client_id' => $uid,
            'date_transaction' => date('Y-m-d h:i:s', time()),
            'voiture_id' => $vid,
            'frais' => $fees,
            'code_reservation' => $code,
            'type' => $type,
            'status' => $raison,
            'montant' => $montant,
            'etat' => $etat,
            'reservation' => serialize($reservation),
            'data' => $ttransaction
        ];
        try {
            $t = Transaction::create($data1);
            if ($reservation) {
                $reservation->etat = $etat;
                $reservation->save();
            }
            if ($t) {
                if ($etat === 1) {
                    Session::flash('success', [
                        'title' => "Transaction effectutée",
                        "message" => "Votre payement a été entrégistrée avec succès !"
                    ]);
                }
                return to_route('front.lcommande3', ['id' => $t->id]);
            }
        } catch (\Exception $e) {
            //dd($e);
            Session::flash('warning', [
                'title' => "Erreur d'enrégistrement",
                "message" => "Une erreur est survenue au court de l'enrégistrement, veuillez réessayer !"
            ]);
            return back()->with(['error' => $e->getMessage()]);
        }
    }

    public function getCommandeLocation3($id, Request $request)
    {
        $transaction = Transaction::where('id', $id)->where('client_id', $this->getUserId())->firstOrFail();
        $reservation = unserialize($transaction->reservation);
        $reservation = Reservation::where('code_reservation', $transaction->code_reservation)
            ->with('PointRetrait')->with('location')->first();
        $voiture = null;
        if ($reservation) {
            $voiture = $reservation->voiture;
        }
        $numFacture = '';
        if ($transaction && $reservation) {
            $numFacture = $this->getNumFacture($transaction->id, $reservation->id);
        }
        if ($transaction && $transaction->etat != 1) {
            return to_route('front.lcommande3', ['id' => $reservation->id]);
        }
        $entete = WebInfo::where('code', 'entete_facture')->first();
        // dd($reservation);
        return Inertia::render(self::$folder . 'CommandeLocation/Step3', [
            'transaction' => $transaction,
            'reservation' => $reservation,
            'voiture' => $voiture,
            'entete' => $entete,
            'num_facture' => $numFacture,
        ]);
    }
    public function clearReservationCode(Request $request)
    {
        $response = new Response();
        $middleware = new setOrCheckReservationCode();
        $middleware->deleteReservationCodeCookie($response);

        // You can also return a response with the cookie deleted
        return $response;
    }

    function getFactureLocation($idtransaction)
    {

        $transaction = Transaction::where('id', $idtransaction)->first(); //->firstOrFail();
        $reservation = unserialize($transaction->reservation);
        $reservation = $transaction->getReservation()->first();
        $voiture = null;
        if ($reservation) {
            $voiture = $reservation->voiture;
        }
        $numFacture = '';
        if ($transaction && $reservation) {
            $numFacture = $this->getNumFacture($transaction->id, $reservation->id);
        }
        $entete = WebInfo::where('code', 'entete_facture')->first();
        $data = [
            'transaction' => $transaction,
            'reservation' => $reservation,
            'voiture' => $voiture,
            'entete' => $entete,
            'num_facture' => $numFacture,
        ];
    }
    
    function getNumFacture($n1, $n2)
    {
        return $this->formatSur4Chiffres($n1) . "-" . $this->formatSur4Chiffres($n2);
    }
    function formatSur4Chiffres($nombre)
    {
        $nombreString = (string)$nombre;

        $longueur = strlen($nombreString);
        if ($longueur < 4) {
            $zerosToAdd = 4 - $longueur;
            $nombreString = str_repeat('0', $zerosToAdd) . $nombreString;
        }
        return $nombreString;
    }
    public function converDateToDB($date)
    {
        $dateObj = \DateTime::createFromFormat('d/m/Y', $date);
        if ($dateObj === false) {
            return false;
        }
        return $dateObj->format('Y-m-d');
    }
    public function setCookie($name, $value, $minutes = 60)
    {

        $response = new Response($name);
        $response->withCookie(cookie($name, $value, $minutes));
        return $response;
    }
    public function getCookie(Request $request, $name)
    {
        $value = $request->cookie($name);
        return $value;
    }
    public function getUserId()
    {
        return  Auth::user() ? Auth::user()->id : 0;
    }
}
