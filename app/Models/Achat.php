<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achat extends Model
{
    use HasFactory;
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'achats';
    protected $fillable = [
        'en_vente_ids',
        'voiture_ids',
        'telephone',
        'montant',
        'tva',
        'total',
        'client_id',
        'location',
        'pays_id',
        'email',
        'nom',
        'prenom',
        'code_achat',
        'date_naissance',
        'lieu_naissance',
        'type_piece_identite',
        'numero_piece_identite',
        'numero_permis',
        'adresse_residence',
        'ville_residence',
        'infos',
        'etat',
    ];

}
