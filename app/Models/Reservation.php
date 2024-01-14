<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reservations';
    protected $fillable = [
        'location_id',
        'voiture_id',
        'user_id',
        'point_id',
        'pays_id',
        'nom_voiture',
        'nom_complet',
        'date_debut',
        'date_fin',
        'date_naissance',
        'lieu_naissance',
        'type_piece_identite',
        'numero_piece_identite',
        'numero_permis',
        'adresse_residence',
        'ville_residence',
        'date_expiration_permis',
        'nb_annee_conduite',
    ];
    
}
