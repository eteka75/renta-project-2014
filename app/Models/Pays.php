<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    use HasFactory;
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
    public function marques(): HasMany
    {
        return $this->hasMany(Marque::class);
    }

}
