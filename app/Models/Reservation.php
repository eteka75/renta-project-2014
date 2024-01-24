<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'telephone',
        'pays_id',
        'location',
        'email',
        'nom_complet',
        'date_debut',
        'date_fin',
        'code_reservation',
        'date_naissance',
        'montant',
        'tva',
        'lieu_naissance',
        'type_piece_identite',
        'numero_piece_identite',
        'numero_permis',
        'adresse_residence',
        'ville_residence',
        'date_expiration_permis',
        'nb_annee_conduite',
        'etat',
    ];

    public function location(): BelongsTo
    {
        return $this->belongsTo(EnLocation::class,'location_id');
    }
    public function voiture(): BelongsTo
    {
        return $this->belongsTo(Voiture::class,'voiture_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function pointRetrait(): BelongsTo
    {
        return $this->belongsTo(PointRetrait::class,'point_id');
    }
    public function pays(): BelongsTo
    {
        return $this->belongsTo(Pays::class,'pays_id');
    }
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class,'reservation_id','id');
    }    
}
