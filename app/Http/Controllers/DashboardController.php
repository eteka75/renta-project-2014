<?php

namespace App\Http\Controllers;

use App\Models\Achat;
use App\Models\AchatTransaction;
use App\Models\EnLocation;
use App\Models\EnVente;
use App\Models\Reservation;
use App\Models\Transaction;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private static $viewFolder = "Dashboard";
    public function __construct(){
        $this->middleware('admin');
    }
    public function index()
    {
        $nb_voitures= Voiture::count();
        $nb_en_vente= EnVente::where('en_vente',1)->count();
        $en_location= EnLocation::where('etat',1)->count();
        $somme_reservaions = Reservation::where('etat','>=',1)->sum('montant');
        $somme_frais1 = Transaction::where('etat','>=',1)->sum('frais');
        $somme_ventes = Achat::where('etat','>=',1)->sum('montant');
        $somme_frais2 = AchatTransaction::where('etat','>=',1)->sum('frais');
        $total_frais= (int)$somme_frais1 + (int) $somme_frais2;
        return Inertia::render(self::$viewFolder . '/Index', [
            'page_name' => "dashboard",
            "nb_voitures"=>$nb_voitures,
            "nb_en_location"=>$en_location,
            "total_vente"=>$somme_ventes,
            "total_locations"=>$somme_reservaions,
            "total_frais"=>$total_frais,
            "nb_en_vente"=>$nb_en_vente,
        ]);
    }
}
