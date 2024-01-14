<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'clients';
    protected $fillable = [
        'date_naissance',
        'lieu_naissance',
        'ville_residence',
        'type_piece_identite',
        'adresse',
        'fichier_identite1',
        'fichier_identite2',
        'fichier_identite3',
        'description',
        'user_id',
        'pays_id',
        'numero_piece_identite',
        'numero_permis',
        'date_expiration_permis',
        'nb_annee_conduite',
    ];
}
