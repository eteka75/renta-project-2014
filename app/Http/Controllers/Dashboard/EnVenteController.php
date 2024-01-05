<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestEnLocationRequest;
use App\Http\Requests\RequestEnVente;
use App\Models\Media;
use App\Models\OptionVente;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PointRetrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\EnLocation;
use App\Models\Voiture;
use App\Models\EnVente;
use Inertia\Inertia;

class EnVenteController extends Controller
{
    private static $viewFolder = "Dashboard/Ventes";
    private static $imageFolder = "storage/datas/en_ventes/";
    private static $pageId = "ventes";
    private static $pageSubid = "ventes";
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
        $total = EnVente::count();
        Inertia::share(['total' => $total]);

        if (!empty($keyword)) {
            $ventes = EnVente::with('voiture')
                ->with('pointRetrait')
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
        } else {
            $ventes = EnVente::with('voiture')->latest()->paginate($perPage);
        }
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'ventes' => $ventes,
            'count' => $ventes->count(),
            'page_title' => "Ventes",
            'page_subtitle' => "Gestion des ventes de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $voitures = Voiture::with('medias')->orderBy('nom')->get(); //select('nom', 'id')->
        $points = PointRetrait::select('lieu', 'id')->orderBy('lieu')->get();
        $options_ventes = OptionVente::select('nom', 'prix', 'id')->orderBy('nom')->get();

        Inertia::share([
            'voitures' => $voitures,
            'point_retraits' => $points,
            'options_ventes' => $options_ventes
        ]);

        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle vente",
            'page_subtitle' => "Ajouter une nouvelle vente de voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestEnVente $request)
    {
        
        $data = $request->except('photos');
        $data['date_debut_vente'] = $this->converDateToDB($data['date_debut_vente']);
        $data['date_fin_vente'] = $this->converDateToDB($data['date_fin_vente']);

        $nb_chevauchements = $this->checkLocationChevauchement($data['voiture_id'], $data['date_debut_vente'], $data['date_fin_vente']);
        if ($nb_chevauchements->count('id') > 0) {
            Session::flash(
                'danger',
                [
                    'title' => 'Chevauchement de vente',
                    'message' => 'Le véhicule sélectionné est en vente pendant la prériode sélectionnée.',
                ]
            );
            return redirect()->back()->withInput();

        }

        $userId = \Auth::id() ?? '0';
        $data['user_id'] = $userId;
        $envente= EnVente::create($data);
        $options=$data['options_vente'];
        if(is_array($options)){
            $envente->optionVentes()->sync($options);
        }
        $voiture_id = $data['voiture_id'];
        if ($request->hasFile('photos')) {
            $getSaves = $this->savePhotos($request, $voiture_id);
            if ($getSaves !== []) {
                Session::flash(
                    'info',
                    [
                        'message' => 'Images sauvegardées !',
                    ]
                );
            }
        }
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.ventes');
    }

    public function checkLocationChevauchement($voiture_id, $nouvelleDateDebut, $nouvelleDateFin, $vente_id = '')
    {
        if ($vente_id == '') {

            return EnVente::where('voiture_id', $voiture_id)->where(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                $query->whereBetween('date_debut_vente', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhereBetween('date_fin_vente', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhere(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                        $query->where('date_debut_vente', '<=', $nouvelleDateDebut)
                            ->where('date_fin_vente', '>=', $nouvelleDateFin);
                    });
            })->get();
        } else {
            return EnVente::where('id', $vente_id)->where('voiture_id', $voiture_id)->where(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                $query->whereBetween('date_debut_vente', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhereBetween('date_fin_vente', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhere(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                        $query->where('date_debut_vente', '<=', $nouvelleDateDebut)
                            ->where('date_fin_vente', '>=', $nouvelleDateFin);
                    });
            })->get();
        }
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
        $vente = EnVente::with('voiture')->with('pointRetrait')->with('optionVentes')->where('id', $id)->firstOrFail();
        $voiture=Voiture::with('medias')->where('id',$vente->voiture_id)->first();
        $vente_name = $vente->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'vente' => $vente,
            'voiture' => $voiture,
            'page_title' => "Location " . $vente_name,
            'page_subtitle' => "Affichage de détail sur " . $vente_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $voitures = Voiture::orderBy('nom')->get(); //select('nom', 'id')->
        $points = PointRetrait::select('lieu', 'id')->orderBy('lieu')->get();
        $options_ventes = OptionVente::select('nom', 'prix', 'id')->orderBy('nom')->get();

        Inertia::share([
            'voitures' => $voitures,
            'point_retraits' => $points,
            'options_ventes' => $options_ventes
        ]);
        $vente = EnVente::with('voiture')->with('pointRetrait')->with('optionVentes')->findOrFail($id);

        return Inertia::render(self::$viewFolder . '/Edit', [
            'vente' => $vente,
            'page_title' => "Edition d'une vente",
            'page_subtitle' => "Modification d'une vente de voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $ventes = EnVente::with('voiture')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'ventes' => $ventes,
            'page_title' => "Export des ventes",
            'page_subtitle' => "Exportations des ventes de voitures",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestEnVente $request, $id)
    {
        $validator = Validator::make($request->all(), (new RequestEnVente())->rules());

        // Check if the validation fails
        if ($validator->fails()) {
            $errors = $validator->errors()->getMessages();
            foreach ($errors as $k=>$error) {
                Session::flash("warning", ['title'=>'Erreur: '.$k,'message'=>$error]);
            }
            return back();
        }
        $data = $request->except("photos");
        $data['date_debut_vente'] = $this->converDateToDB($data['date_debut_vente']);
        $data['date_fin_vente'] = $this->converDateToDB($data['date_fin_vente']);
        $nb_chevauchements = $this->checkLocationChevauchement($data['voiture_id'], $data['date_debut_vente'], $data['date_fin_vente'],$id);
        if ($nb_chevauchements->count('id') > 0) {
            $first = $nb_chevauchements->first();
            if ($first->id != $id) {
                Session::flash(
                    'danger',
                    [
                        'title' => 'Chevauchement de vente',
                        'message' => 'Le véhicule sélectionné est en vente pendant la prériode sélectionnée.',
                    ]
                );
                return redirect()->back()->withInput();
            }

        }
        //dd($data);
        $userId = \Auth::id() ?? '0';
        $data['user_id'] = $userId;
        $envente = EnVente::findOrFail($id);
        $envente->update($data);
        $options=$data['options_vente'];
        //dd($options);
        if(is_array($options) && count($options) > 0) {
            $envente->optionVentes()->sync($options);
        }else{$envente->optionVentes()->sync([]);}

        $voiture_id = $data['voiture_id'];
        if ($request->hasFile('photos')) {
            $getSaves = $this->savePhotos($request, $voiture_id);
            if ($getSaves !== []) {
                Session::flash(
                    'info',
                    [
                        'message' => 'Images sauvegardées !',
                    ]
                );
            }
        }
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.ventes');
    }

    public function savePhotos(FormRequest $request, $voiture_id = '')
    {
        $uploadedImages = [];
        if ($voiture_id != '') {
            $voiture = Voiture::where('id', $voiture_id)->firstOrFail();
            foreach ($request->file('photos') as $image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $destinationPath = (self::$imageFolder);
                if (!Storage::exists($destinationPath)) {
                    Storage::makeDirectory($destinationPath);
                }
              
                $image->move($destinationPath, $filename);
                $path = self::$imageFolder . $filename;

                // Save image information to the database
                $m= Media::create([
                    'url' => $path,
                    'dossier' => self::$imageFolder,
                    'nom' => $filename,
                    'original_name' => $image->getClientOriginalName(),
                ]);
                $voiture->medias()->attach($m->id);
                $uploadedImages[]= $m;
            }
        }
        return $uploadedImages;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $vente = EnVente::findOrFail($id);
        $vente->optionVentes()->sync([]);
        $vente->delete();
        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.ventes');
    }
}
