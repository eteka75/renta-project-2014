<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\OperationVoiture;
use Illuminate\Http\Request;
use App\Http\Requests\RequestOperationVoitureRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Voiture;

class OperationVoitureController extends Controller
{
    private static $viewFolder = "Dashboard/Operations";
    private static $imageFolder = "storage/datas/operations_voitures/";
    private static $pageId = "voitures";
    private static $pageSubid = "operations";
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
        $total = OperationVoiture::count();
        Inertia::share(['total' => $total]);

        if (!empty($keyword)) {
            $operations = OperationVoiture::with('voiture')->where('nom_operation', 'LIKE', "%$keyword%")
                ->orWhere('prix_operation', 'LIKE', "%$keyword%")
                ->orWhere('responsable_operation', 'LIKE', "%$keyword%")
                ->orWhere('kilometrage', 'LIKE', "%$keyword%")
                ->orWhere('date_operation', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%")
                ->orWhereHas('voiture', function ($query) use ($keyword) {
                    $query->where('nom', 'like', "%{$keyword}%")
                        ->orWhere('description', 'like', "%{$keyword}%");
                })
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $operations = OperationVoiture::with('voiture')->latest()->paginate($perPage);
        }
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'operations' => $operations,
            'count' => $operations->count(),
            'page_title' => "Opérations",
            'page_subtitle' => "Gestion des opérations",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $voitures = Voiture::select('nom', 'id')->orderBy('nom')->get();
        Inertia::share(['voitures' => $voitures]);

        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle opération",
            'page_subtitle' => "Ajouter une nouvelle opération effectuée sur une voiture",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestOperationVoitureRequest $request)
    {
        $data = $request->except('fichier');
        if ($request->hasFile('fichier')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['fichier'] = $getSave;
            }
        }
        $userId = \Auth::id() ?? '0';
        $data['user_id'] = $userId;
        $data['date_operation'] = $this->converDateToDB($data['date_operation']);
        //dd($data);
        OperationVoiture::create($data);
        Session::flash(
            'success',
            [
                'title' => 'Enrégistrement effectué',
                'message' => 'Les données ont été enregistrées avec succès!',
            ]
        );

        return to_route('dashboard.operations');
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
        $operation = OperationVoiture::with('voiture')->where('id', $id)->firstOrFail();
        $operation_name = $operation->nom_operation;
        return Inertia::render(self::$viewFolder . '/Show', [
            'operation' => $operation,
            'page_title' => "" . $operation_name,
            'page_subtitle' => "Affichage de détail sur " . $operation_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $operation = OperationVoiture::with('voiture')->findOrFail($id);
        $voitures = Voiture::select('nom', 'id')->orderBy('nom')->get();
        Inertia::share(['voitures' => $voitures]);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'operation' => $operation,
            'page_title' => "Edition d'une opération",
            'page_subtitle' => "Modification d'une opération effectuée sur un voiture",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $operations = OperationVoiture::with('voiture')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'operations' => $operations,
            'page_title' => "Export des opérations",
            'page_subtitle' => "Exportations des opérations effectuées sur les voitures",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestOperationVoitureRequest $request, $id)
    {

        $operation = OperationVoiture::findOrFail($id);
        $data = $request->except("logo");
        if ($request->hasFile('fichier')) {
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['fichier'] = $getSave;
            }
        }
        $data['date_operation'] = $this->converDateToDB($data['date_operation']);

        $operation->update($data);
        if (isset($data['fichier']) && $data['fichier'] != '') {
            $operation->update([
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
        return to_route('dashboard.operations');
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

        $operation = OperationVoiture::findOrFail($id);
        $operation->delete();
        Session::flash(
            'warning',
            [
                'title' => 'Suppression effectuée',
                'message' => "La Suppression de l'enrégistrement a été effectuée avec succès!",
            ]
        );
        return to_route('dashboard.operations');
    }
}
