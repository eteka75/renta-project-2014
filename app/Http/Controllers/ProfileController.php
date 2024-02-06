<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller\Dashboard;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\RequestIdentificationClient;
use App\Models\Client;
use App\Models\Favori;
use App\Models\Pays;
use App\Models\Reservation;
use App\Models\Transaction;
use App\Models\WebInfo;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    private static $viewFolder = "Dashboard/Profile";
    private static $imageFolder = "storage/datas/users/";
    private static $imageFolderClient = "storage/datas/users/clients/";
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display the user's profile form.
     */
    public function getProfile(Request $request): Response
    {
        Inertia::share(['active_menu' => 'home_compte']);
        return Inertia::render('Profile/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'page_title' => 'Mon profil',
            'page_subtitle' => "Consultez et modifiez votre compte",
        ]);
    }
    public function edit(Request $request): Response
    {
        Inertia::share(['active_menu' => 'edit_compte']);
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function editPassword(Request $request): Response
    {
        Inertia::share(['active_menu' => 'edit_pwd']);
        return Inertia::render('Profile/EditPassword', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function accountDelete(Request $request): Response
    {
        Inertia::share(['active_menu' => 'delete']);
        return Inertia::render('Profile/Delete', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function editSettings(Request $request): Response
    {
        Inertia::share(['active_menu' => 'params']);
        return Inertia::render('Profile/Parametres', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function getActivity(): Response
    {
        Inertia::share(['active_menu' => 'activity']);
        return Inertia::render('Profile/Activity', [
            'page_id' => '',
            'page_title' => 'Mes activités',
            'page_subtitle' => "Consultez mes activités sur Rental Car Services",
        ]);
    }
    public function getNotifications(): Response
    {
        Inertia::share(['active_menu' => 'notifications']);
        return Inertia::render('Profile/Notifications', [
            'page_id' => '',
            'page_title' => 'Notifications',
            'page_subtitle' => "Découvrez les notifications liées à votre compte",
        ]);
    }
    public function getFavoris(Request $request): Response
    {
        $nb = 12;
        $user = $request->user();
        if (!$user) {
            return to_route('login');
        }
        $favs = Favori::with('locations.voiture')->with('achats.voiture')->where('user_id', $user->id)->latest()->paginate($nb);
        // $fav=($user->favoris()->paginate(10));
        //dd($favs);
        Inertia::share(['active_menu' => 'favoris']);
        return Inertia::render('Profile/Favoris', [
            'page_id' => '',
            'list_favoris' => $favs,
            'page_title' => 'Favoris',
            'page_subtitle' => "Consultez les voitures que vous avez sauvegardés à vos favoris",
        ]);
    }
    public function getLocations(): Response
    {
        $nb_transactions_per_page=20;
        $reservations = Auth::user()->reservations()->latest()
        ->whereHas('transactions')
        ->with('voiture')
        ->with('transactions')->paginate($nb_transactions_per_page);
        //dd($reservations);
        $count=$reservations->count();
        Inertia::share(['active_menu' => 'locations']);
        return Inertia::render('Profile/Locations', [
            'page_id' => '',
            'page_title' => 'Locations',
            'count' => $count,
            'reservations' => $reservations,
            'page_subtitle' => "Jetez un coup d'oeil sur vos commandes de locations de voitures",
        ]);
    }
    public function getActivityLocation($id): Response
    {
        $reservation = Reservation::where('user_id', $this->getUserId())
        ->with('transactions')
        ->with('pointRetrait')
        ->whereHas('transactions')
        ->with('voiture')
        ->findOrFail($id);
        $code = $reservation->code_reservation;
        $transaction = Transaction::where('code_reservation', $code)->where('client_id',$this->getUserId())->firstOrFail();
      // dd($reservation->code_reservation,$code);
       
        $voiture = null;
        if ($reservation) {
            $voiture = $reservation->voiture;
        }
        $numFacture = '';
        if ($transaction && $reservation) {
            $numFacture = $this->getNumFacture($transaction->id, $reservation->id);
        }
        if($transaction && $transaction->etat!=1){
            return to_route('front.lcommande3',['id'=>$reservation->id]);
        }
        $entete = WebInfo::where('code', 'entete_facture')->first();
        // dd($reservation);
      
        //$nom = $reservation->
        return Inertia::render('Profile/Location', [
            'page_id' => '',
            'page_title' => 'Locations',
            'page_subtitle' => "Détail sur votre réservation de voiture",
            'reservation' => $reservation,
            'transaction' => $transaction,
            'voiture' => $voiture,
            'entete' => $entete,
            'num_facture' => $numFacture,
        ]);
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
    public function getUserId()
    {
        return Auth::user()?Auth::user()->id:0;
    }
    public function getAchats(): Response
    {
        $nb_transactions_per_page=20;
        $achats = Auth::user()->getAchatsWithVoitures($nb_transactions_per_page);
        
        dd($achats);
        $count=$achats->count();
        Inertia::share(['active_menu' => 'achats']);
        return Inertia::render('Profile/Achats', [
            'page_id' => '',
            'page_title' => 'Achats',            
            'count' => $count,
            'achats' => $achats,
            'page_subtitle' => "En savoir plus sur vos achats",
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['photo']);

        if ($request->hasFile('photo')) {
            $getSave = $this->savePhoto($request);
            if ($getSave !== '') {
                $this->deleteImage($request->user()->photo);
                $data['photo'] = $getSave;
            }
        }

        $request->user()->fill($data);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    public function deleteImage($filePath)
    {
        if (file_exists($filePath)) {
            if (unlink($filePath)) {
                return true;
            }
        }
        return false;
    }
    public function savePhoto(Request $request)
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
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function getIdentification()
    {      
        $client=Auth::user()->client;       
        Inertia::share([
            'active_menu' => 'identification'
        ]);

        return Inertia::render('Profile/Identification', [
            'page_id' => 'identification',
            'client' =>  $client,
            'page_title' => 'Identification du client',
            'page_subtitle' => "Renseignez les information permettant de valider votre compte",
        ]);
    }
    public function postIdentification(RequestIdentificationClient $request)
    {
        $data = $request->all();
        $uid = Auth::user() ? Auth::user()->id : 0;
        $client = Client::where('user_id', $uid)->first();
        $exp = strlen($request->get('date_expiration_permis') !='') ? $this->converDateToDB($request->get('date_expiration_permis')) : null;
        
        $data1 = [
            "user_id" => $uid,
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
            //code...

            if ($client) {
                if($client->etat!==1){
                    $client->update($data1);
                }else{
                    abort(404);
                }
               
                Session::flash('success', [
                    'title' => "Mise à jour effectuée",
                    "message" => "Votre dossier client a été mise à jour avec succèss !"
                ]);
            } else {
                Session::flash('success', [
                    'title' => "Mise à jour effectuée",
                    "message" => "Votre dossier client a été soumis avec succèss."
                ]);
                Client::create($data1);               
            }
        } catch (\Throwable $th) {
            //throw $th;
            Session::flash('danger', [
                'title' => "Echec de l'enrégistrement",
                "message" => "La soumission de votre dossier a échouée. Veuillez rééssayer"
            ]);
            return back();
        }
        return to_route('profile.identification');
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
    public function converDateToDB($date)
    {
        $dateObj = \DateTime::createFromFormat('d/m/Y', $date);
        if ($dateObj === false) {
            return false;
        }
        return $dateObj->format('Y-m-d');
    }
    public function editIdentification()
    {
         $countries = Pays::select('nom_fr_fr', 'id')->orderBy('nom_fr_fr')->get();
        $client=Auth::user()->client;
        Inertia::share([
            'active_menu' => 'identification',
            'countries' => $countries,
            'client' =>  $client,
        ]);

        return Inertia::render('Profile/IdentificationEdit', [
            'page_id' => 'identification',
            'page_title' => 'Identification et valication de compte ',
            'page_subtitle' => "Renseignez les information permettant de valider votre compte",
        ]);
    }
    public function UpdateIdentification()
    {
    }
}
