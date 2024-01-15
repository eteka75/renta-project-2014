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
        'nom',
        'prenom',
        'date_naissance',
        'lieu_naissance',
        'ville_residence',
        'type_piece_identite',
        'adresse',
        'sexe',
        'fichier_identite',
        'fichier_permis',
        'fichier_residence',
        'description',
        'user_id',
        'pays_id',
        'numero_piece_identite',
        'date_expiration_permis',
        'numero_permis',
        'nb_annee_conduite',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
