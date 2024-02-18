<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandesController extends Controller
{
    private static $viewFolder = "Dashboard/Commandes";
    private static $imageFolder = "storage/datas/commandes/";
    private static $pageId = "commandes";
    private static $pageSubid1 = "clocations";
    private static $pageSubid2 = "clocations";
    private static $nbPerPage = 10;

    public function __construct(){
        $statics=[
            'page_id' => self::$pageId
        ];
        Inertia::share($statics);
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function getCLocations(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total=Reservation::where('etat',1)->count();
        Inertia::share(['total'=>$total,'page_subid'=>$this->pageSubid1]);
        
        $commandes = Reservation::paginate($perPage);

        $count =$commandes->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'commandes' => $commandes,
            'page_title' => "Réservations",
            'page_subtitle' => "Gestion des réservations de véhicules",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getCVentes()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
