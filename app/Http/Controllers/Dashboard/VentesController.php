<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Achat;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VentesController extends Controller
{
    private static $viewFolder = "Dashboard/CVentes";
    private static $imageFolder = "storage/datas/cventes/";
    private static $pageId = "ccommandes";
    private static $pageSubid = "cventes";
    private static $pageSubid2 = "clocations";
    private static $nbPerPage = 10;

    public function __construct(){
        $statics=[
            'page_id' => self::$pageId,
            'page_subid'=>self::$pageSubid

        ];
        Inertia::share($statics);
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function getCVentes(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total = Achat::where('etat','>',0)->count();
        Inertia::share(['total'=>$total,]);
        
        $achats = Achat::where('etat',">",0)
        ->with('pays')
        ->with('transaction')
        ->with('voitures')
        ->with('ventes')
        ->latest()->paginate($perPage);
        
        $count = $achats->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'achats' => $achats,
            'page_title' => "Réservation de locations",
            'page_subtitle' => "Gestion des réservations de véhicules",
        ]);
    }

    public function getCVente($id)
    {
        $commande = Achat::where('etat',">",0)
        ->with('pays')
        ->with('transaction')
        ->with('voitures')
        ->with('ventes')
        ->with('user')->where('id',$id)->firstOrFail();
       
        $code =$commande->code_achat;
        return Inertia::render(self::$viewFolder . '/Show', [
            'commande' => $commande,
            'page_title' => "Achat de voitures",
            'page_subtitle' => "Affichage de la commande ".$code,
        ]);
    }

}
