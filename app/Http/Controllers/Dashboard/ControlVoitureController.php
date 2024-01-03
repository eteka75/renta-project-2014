<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestcontroleVoitureRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Models\ControlVoiture;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Voiture;

class ControlVoitureController extends Controller
{
    private static $viewFolder = "Dashboard/Controles";
    private static $imageFolder = "storage/datas/controles_techniques/";
    private static $pageId = "voitures";
    private static $pageSubid = "controles";
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
        $total = ControlVoiture::count();
        Inertia::share(['total' => $total]);

        if (!empty($keyword)) {
            $controles = ControlVoiture::with('voiture')->where('nom_controle', 'LIKE', "%$keyword%")
                ->orWhere('date_controle', 'LIKE', "%$keyword%")
                ->orWhere('kilometrage', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->orWhereHas('voiture', function ($query) use ($keyword) {
                    $query->where('nom', 'like', "%{$keyword}%")
                    ->orWhere('description', 'like', "%{$keyword}%");
                })
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $controles = ControlVoiture::with('voiture')->latest()->paginate($perPage);
        }
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'controles' => $controles,
            'count' => $controles->count(),
            'page_title' => "Contrôles techniques",
            'page_subtitle' => "Gestion des contrôles techniques",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $voitures = Voiture::select('nom', 'id')->orderBy('nom')->get();
        Inertia::share(['voitures'=>$voitures]);
        
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouveau contrôle technique",
            'page_subtitle' => "Ajouter un nouveau contrôle technique de voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestcontroleVoitureRequest $request)
    {
        
        $data =  $request->except('fichier');
        if ($request->hasFile('fichier')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['fichier'] = $getSave;
            }
        }
        $userId = \Auth::id()??'0';
        $data['user_id']=$userId;
        $data['date_controle']=$this->converDateToDB($data['date_controle']);        
        ControlVoiture::create($data);
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.controle_techniques');
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
        $controle = ControlVoiture::with('voiture')->where('id', $id)->firstOrFail();
        $controle_name = $controle->nom_controle;
        return Inertia::render(self::$viewFolder . '/Show', [
            'controle' => $controle,
            'page_title' => "Contrôle technique : " . $controle_name,
            'page_subtitle' => "Affichage de détail sur " . $controle_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $controle = ControlVoiture::with('voiture')->findOrFail($id);
        $voitures = Voiture::select('nom', 'id')->orderBy('nom')->get();
        Inertia::share(['voitures'=>$voitures]);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'controle' => $controle,
            'page_title' => "Edition de contrôle technique",
            'page_subtitle' => "Modification d'une contrôle technique de voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $controles = ControlVoiture::with('voiture')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'controles' => $controles,
            'page_title' => "Export des contrôles techniques",
            'page_subtitle' => "Exportations des contrôles techniques de voitures",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestcontroleVoitureRequest $request, $id)
    {

        $controle = ControlVoiture::findOrFail($id);
        $data = $request->except("logo");
        if ($request->hasFile('fichier')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['fichier'] = $getSave;
            }
        }
        $data['date_controle']=$this->converDateToDB($data['date_controle']);

        $controle->update($data);
        if (isset($data['fichier']) && $data['fichier'] != '') {
            $controle->update([
                'fichier' => $data['fichier']
            ]);
        }
        Session::flash(
            'info',
            [
                'title' => 'Mise à jour effectuée',
                'message' => 'Les données ont été modifiées avec succès!',
            ]
        );
        return to_route('dashboard.controle_techniques');
    }

    public function saveLogo(FormRequest $request)
    {
        $nomLogo = '';
        if ($request->hasFile('fichier')) {
            $file = $request->file('fichier');
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

        $controle = ControlVoiture::findOrFail($id);
        $controle->delete();
        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.controle_techniques');
    }
}
