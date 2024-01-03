<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestEnLocationRequest;
use App\Models\EnLocation;
use App\Models\Media;
use App\Models\PointRetrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Voiture;
use Inertia\Inertia;

class EnLocationController extends Controller
{

    private static $viewFolder = "Dashboard/Locations";
    private static $imageFolder = "storage/datas/location_voitures/";
    private static $pageId = "locations";
    private static $pageSubid = "locations";
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
        $total = EnLocation::count();
        Inertia::share(['total' => $total]);

        if (!empty($keyword)) {
            $locations = EnLocation::with('voiture')
                ->with('pointRetrait')
                ->orWhere('tarif_location_heure', 'LIKE', "%$keyword%")
                ->orWhere('tarif_location_hebdomadaire', 'LIKE', "%$keyword%")
                ->orWhere('tarif_location_journalier', 'LIKE', "%$keyword%")
                ->orWhere('tarif_location_mensuel', 'LIKE', "%$keyword%")
                ->orWhere('date_debut_location', 'LIKE', "%$keyword%")
                ->orWhere('date_fin_location', 'LIKE', "%$keyword%")
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
            $locations = EnLocation::with('voiture')->latest()->paginate($perPage);
        }
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'locations' => $locations,
            'count' => $locations->count(),
            'page_title' => "Locations",
            'page_subtitle' => "Gestion des locations de voitures",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $voitures = Voiture::With('locationMedias')->orderBy('nom')->get(); //select('nom', 'id')->
        $points = PointRetrait::select('lieu', 'id')->orderBy('lieu')->get();

        Inertia::share([
            'voitures' => $voitures,
            'point_retraits' => $points
        ]);

        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle location",
            'page_subtitle' => "Ajouter une nouvelle location de voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestEnLocationRequest $request)
    {
        $data = $request->except('fichier');
        $data['date_debut_location'] = $this->converDateToDB($data['date_debut_location']);
        $data['date_fin_location'] = $this->converDateToDB($data['date_fin_location']);

        $chevauchements = $this->checkLocationChevauchement($data['voiture_id'], $data['date_debut_location'], $data['date_fin_location']);
        
        if ($chevauchements->count('id') > 0) {
            Session::flash(
                'danger',
                [
                    'title' => 'Chevauchement de location',
                    'message' => 'Le véhicule sélectionné est en location pendant la prériode sélectionnée.',
                ]
            );
            return redirect()->back()->withInput();

        }
        if ($request->hasFile('photos')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['fichier'] = $getSave;
            }
        }
        $userId = \Auth::id() ?? '0';
        $data['user_id'] = $userId;
        $location = EnLocation::create($data);
        $points = $data['point_retraits'];
        if(count($points) > 0) {
        $location->pointsRetrait()->sync($points);
        }

       if ($request->hasFile('photos')) {
            $voiture_id=$data['voiture_id'];
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

        return to_route('dashboard.locations');
    }

    public function savePhotos(FormRequest $request, $voiture_id = '')
    {
        $uploadedImages = [];
        if ($voiture_id != '') {
            $voiture = Voiture::where('id', $voiture_id)->firstOrFail();
            foreach ($request->file('photos') as $image) {
                $destinationPath = (self::$imageFolder);
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();                
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
                $voiture->locationMedias()->attach($m->id);
                $uploadedImages[]= $m;
                //dd($m);
            }
        }
        return $uploadedImages;
    }

    public function checkLocationChevauchement($voiture_id, $nouvelleDateDebut, $nouvelleDateFin, $location_id = '')
    {
        if ($location_id == '') {

            return EnLocation::where('voiture_id', $voiture_id)->where(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                $query->whereBetween('date_debut_location', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhereBetween('date_fin_location', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhere(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                        $query->where('date_debut_location', '<=', $nouvelleDateDebut)
                            ->where('date_fin_location', '>=', $nouvelleDateFin);
                    });
            })->get();
        } else {
            return EnLocation::where('id', $location_id)->where('voiture_id', $voiture_id)->where(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                $query->whereBetween('date_debut_location', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhereBetween('date_fin_location', [$nouvelleDateDebut, $nouvelleDateFin])
                    ->orWhere(function ($query) use ($nouvelleDateDebut, $nouvelleDateFin) {
                        $query->where('date_debut_location', '<=', $nouvelleDateDebut)
                            ->where('date_fin_location', '>=', $nouvelleDateFin);
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
        $location = EnLocation::with('voiture')->with('pointsRetrait')->where('id', $id)->firstOrFail();
        $voiture= Voiture::with('locationMedias')->where('id',$location->voiture_id)->first();

        $location_name = $location->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'location' => $location,
            'voiture' => $voiture,
            'page_title' => "Location " . $location_name,
            'page_subtitle' => "Affichage de détail sur " . $location_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $voitures = Voiture::orderBy('nom')->get();
        $points = PointRetrait::select('lieu', 'id')->orderBy('lieu')->get();
        Inertia::share([
            'voitures' => $voitures,
            'point_retraits' => $points
        ]);
        $location = EnLocation::with('voiture')->with('pointsRetrait')->findOrFail($id);

        return Inertia::render(self::$viewFolder . '/Edit', [
            'location' => $location,
            'page_title' => "Edition d'une location",
            'page_subtitle' => "Modification d'une location de voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $locations = EnLocation::with('voiture')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'locations' => $locations,
            'page_title' => "Export des locations",
            'page_subtitle' => "Exportations des locations de voitures",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestEnLocationRequest $request, $id)
    {
        $data = $request->except("logo");
        $data['date_debut_location'] = $this->converDateToDB($data['date_debut_location']);
        $data['date_fin_location'] = $this->converDateToDB($data['date_fin_location']);

        $chevauchements = $this->checkLocationChevauchement($data['voiture_id'], $data['date_debut_location'], $data['date_fin_location']);
        foreach($chevauchements as $chevauchement) {
            
            if ($chevauchement->id != $id) {
                Session::flash(
                    'danger',
                    [
                        'title' => 'Chevauchement de location',
                        'message' => 'Le véhicule sélectionné est en location pendant la prériode sélectionnée.',
                    ]
                );
                return redirect()->back()->withInput();
            }
        }
        $location = EnLocation::findOrFail($id);
        $location->update($data);
        $points = $data['point_retraits'];
        if(count($points) > 0) {
        $location->pointsRetrait()->sync($points);
        }
        /*Photos*/
        if ($request->hasFile('photos')) {
            $voiture_id=$data['voiture_id'];
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
            'info',
            [
                'title' => 'Mise à jour effectuée',
                'message' => 'Les données ont été modifiées avec succès!',
            ]
        );
        return to_route('dashboard.locations');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $location = EnLocation::findOrFail($id);
        $location->pointsRetrait()->sync([]);
        $location->delete();
        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.locations');
    }
}
