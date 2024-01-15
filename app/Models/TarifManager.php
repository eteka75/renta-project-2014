<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifManager extends Model
{
    use HasFactory;
    public const MONTANT_MINIMUM_LOCATION =5000;

    public static function calculerMontantLocation($date1, $date2, $theure, $tjour, $thebdo, $tmois)
    {
        $nb_conduite_jour=10;
        $tarifheure = self::setMontantHeure($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour);
        $tarifjour = self::setMontantJour($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour);
        $tarifsemaine = self::setMontantSemaine($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour);
        $tarifmois = self::setMontantMois($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour);
        $nb_heures = self::heuresEntreDeuxDates($date1, $date2);
        $r=0;
        if (empty($date1) || empty($date2)) {
            return 0;
        }

        if ($nb_heures < 24) {
            $r=$tarifheure * $nb_heures;
        } elseif ($nb_heures >= 24 && $nb_heures < 24 * 7) {
            $nb_jours = self::joursEntreDeuxDates($date1, $date2);
            $r=$tarifjour * $nb_jours;
        } elseif ($nb_heures >= 24 * 7 && $nb_heures < 24 * 7 * 4) {
            $nb_semaines = self::semainesEntreDeuxDates($date1, $date2);
            $r=$tarifsemaine * $nb_semaines;
        } elseif ($nb_heures >= 24 * 7 * 4 && $nb_heures <= 24 * 7 * 4 * 6) {
            $nb_mois = self::moisEntreDeuxDates($date1, $date2);
            $r=$tarifmois * $nb_mois;
        }

        return self::arrondirAuSuperieurMultipleDeCinq($r);
    }
    public static function arrondirAuSuperieurMultipleDeCinq($montant)
    {
        return ceil($montant / 5) * 5;
    }
    
    public static function getMtMinLocation(){
        return self::MONTANT_MINIMUM_LOCATION;
    }

    static function setMontantHeure($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour)
    {
        $th = self::validateRate($theure);
        $tjour = self::validateRate($tjour);
        $thebdo = self::validateRate($thebdo);
        $tmois = self::validateRate($tmois);
        $tarifjour = 0;
        $nbc = $nb_conduite_jour > 0 ? $nb_conduite_jour : 24;

        if ($th > 0) {
            $tarifjour = $th;
        } elseif ($th == 0 && $tjour > 0) {
            $tarifjour = $tjour / $nbc;
        } elseif ($th === 0 && $tjour === 0 && $thebdo > 0) {
            $tarifjour = $thebdo / ($nbc * 7);
        } elseif ($th === 0 && $tjour === 0 && $thebdo === 0 && $tmois > 0) {
            $tarifjour = $tmois / ($nbc * 7 * 30);
        }

        return $tarifjour;
    }
    private static function validateRate($rate)
    {
        return is_numeric($rate) ? (int)$rate : 0;
    }

    static function setMontantJour($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour)
    {
        $th = self::validateRate($theure);
        $tjour = self::validateRate($tjour);
        $thebdo = self::validateRate($thebdo);
        $tmois = self::validateRate($tmois);
        
        $tarif = 0;

        $nb_conduite_jour = $nb_conduite_jour > 0 ? $nb_conduite_jour : 24;

        if ($tjour > 0) {
            $tarif = $tjour;
        } elseif ($tjour === 0 && $thebdo > 0) {
            $tarif = $thebdo / 7;
        } elseif ($tjour === 0 && $thebdo === 0 && $tmois > 0) {
            $tarif = $tmois / (30);
        } elseif ($tjour === 0 && $thebdo === 0 && $tmois === 0 && $th > 0) {
            return $th * $nb_conduite_jour;
        }

        return $tarif;
    }

    static function setMontantSemaine($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour=10)
    {
        $th = self::validateRate($theure);
        $tjour = self::validateRate($tjour);
        $thebdo = self::validateRate($thebdo);
        $tmois = self::validateRate($tmois);
        $tarif = 0;
        $nb_conduite_jour = $nb_conduite_jour > 0 ? $nb_conduite_jour : 24;

        if ($thebdo > 0) {
            $tarif = $thebdo;
        } elseif ($thebdo === 0 && $tmois > 0) {
            $tarif = $tmois / 4;
        } elseif ($thebdo === 0 && $tmois === 0 && $tjour > 0) {
            $tarif = $tjour * 7;
        } elseif ($thebdo === 0 && $tmois === 0 && $tjour === 0 && $th > 0) {
            return $th * $nb_conduite_jour * 7;
        }

        return $tarif;
    }

    static function setMontantMois($theure, $tjour, $thebdo, $tmois, $nb_conduite_jour=10)
    {
        $th = self::validateRate($theure);
        $tjour = self::validateRate($tjour);
        $thebdo = self::validateRate($thebdo);
        $tmois = self::validateRate($tmois);
        $tarif = 0;

        $nb_conduite_jour = $nb_conduite_jour > 0 ? $nb_conduite_jour : 24;

        if ($tmois > 0) {
            $tarif = $tmois;
        } elseif ($tmois === 0 && $thebdo > 0) {
            $tarif = $thebdo * 4;
        } elseif ($tmois === 0 && $thebdo === 0 && $tjour > 0) {
            $tarif = $tjour * 7 * 4;
        } elseif ($tmois === 0 && $thebdo === 0 && $tjour === 0 && $th > 0) {
            return $th * $nb_conduite_jour * 7 * 4;
        }
        return $tarif;
    }
    public static function joursEntreDeuxDates($date1, $date2)
    {
        $startDate = Carbon::parse($date1);
        $endDate = Carbon::parse($date2);

        $differenceEnMillisecondes = $endDate->diffInMilliseconds($startDate);
        $differenceEnJours = $differenceEnMillisecondes / (1000 * 60 * 60 * 24);

        return $differenceEnJours;
    }

    public static function semainesEntreDeuxDates($date1, $date2)
    {
        $startDate = Carbon::parse($date1);
        $endDate = Carbon::parse($date2);

        $differenceEnMillisecondes = $endDate->diffInMilliseconds($startDate);
        $differenceEnSemaines = $differenceEnMillisecondes / (1000 * 60 * 60 * 24 * 7);

        return $differenceEnSemaines;
    }

    public static function moisEntreDeuxDates($date1, $date2)
    {
        $startDate = Carbon::parse($date1);
        $endDate = Carbon::parse($date2);

        $differenceEnJours = $endDate->diffInDays($startDate);
        $differenceEnMois = $differenceEnJours / 30;

        return $differenceEnMois;
    }
    public static function heuresEntreDeuxDates($date1, $date2)
    {
        $dateDebut = Carbon::parse($date1);
        $dateFin = Carbon::parse($date2);

        $differenceEnMillisecondes = $dateFin->diffInMilliseconds($dateDebut);

        if ($differenceEnMillisecondes > 0) {
            $differenceEnHeures = $differenceEnMillisecondes / (1000 * 60 * 60);
            return $differenceEnHeures;
        } else {
            return 0;
        }
    }
}
