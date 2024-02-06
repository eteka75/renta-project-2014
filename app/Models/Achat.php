<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
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

    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'client_id','id');
    }
    public function transaction(): HasOne
    {
        return $this->hasOne(AchatTransaction::class,'achat_id','id');
    } 
    public function voitures()
    {
        return $this->belongsToMany(Voiture::class,'voiture_achats','achat_id','voiture_id');
    }
    public function ventes()
    {
        return $this->belongsToMany(EnVente::class,'en_vente_achats','achat_id','en_vente_id');
    }
    
}
