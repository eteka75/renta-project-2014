<?php

namespace App\Http\Controllers;

use App\Models\EnLocation;
use App\Models\EnVente;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private static $viewFolder = "Dashboard";
    
    public function index()
    {
        $nb_voitures= Voiture::count();
        $nb_en_vente= EnVente::where('en_vente',1)->count();
        $en_location= EnLocation::where('etat',1)->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'page_name' => "dashboard",
            "nb_voitures"=>$nb_voitures,
            "nb_en_location"=>$en_location,
            "nb_en_vente"=>$nb_en_vente,
        ]);
    }
}
