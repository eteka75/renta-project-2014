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
        'en_vente_id',
        'user_id',
        'point_id',
        'telephone',
        'client_id',
        'location',
        'email',
        'nom',
        'prenom',
        'montant',
        'code_achat ',
        'date_naissance',
        'lieu_naissance',
        'tva',
        'type_piece_identite',
        'numero_piece_identite',
        'numero_permis',
        'adresse_residence',
        'ville_residence',
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
