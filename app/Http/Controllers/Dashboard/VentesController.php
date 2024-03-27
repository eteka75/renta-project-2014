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
        

        if(!empty($keyword)){
            $achats = Achat::where('etat',">",0)
            ->with('pays')
            ->with('transaction')
            ->with('ventes')
           ->whereHas('voitures', function ($query) use ($keyword) {
                $query  ->where('nom', 'like', "%{$keyword}%")
                        ->orWhere('couleur', 'like', "%{$keyword}%")
                        ->orWhere('puissance_moteur', 'like', "%{$keyword}%")
                        ->orWhere('type_transmission', 'like', "%{$keyword}%")
                        ->orWhere('immatriculation', 'like', "%{$keyword}%")
                        ->orWhere('description', 'like', "%{$keyword}%");
            })        
            
            ->orWhere('nom', 'like', "%{$keyword}%")
            ->orWhere('prenom', 'like', "%{$keyword}%")
            ->orWhere('montant', 'like', "{$keyword}%")
            ->with('voitures')->latest()->paginate($perPage);
        }else{            
            $achats = Achat::where('etat',">",0)
            ->with('pays')
            ->with('transaction')
            ->with('voitures')
            ->with('ventes')
            ->latest()->paginate($perPage);
        }
        
        $count = $achats->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'achats' => $achats,
            'page_title' => "Achats des ventes",
            'page_subtitle' => "Gestion des ventes de véhicules",
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

    public function export()
    {
        $achats =  Achat::where('etat',">",0)
        ->with('pays')
        ->with('transaction')
        ->with('voitures')
        ->with('ventes')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'achats' => $achats,
            'page_title' => "Achat de voitures",
            'page_subtitle' => "Export de la liste des achats de voitures ",
        ]);
    }

}
