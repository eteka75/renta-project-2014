<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnVente extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'en_ventes';
    protected $fillable = [
        'delai_livraison',
        'duree_garantie',
        'date_debut_vente',
        'date_fin_vente',
        'prix_vente',
        'prix_defaut',
        'date_vente',
        'kilometrage',
        'voiture_id',
        'point_retrait_id',
        'en_vente',
        'views',
        'description',
    ];

    public function voiture(): BelongsTo
    {
        return $this->belongsTo(Voiture::class,'voiture_id');
    }
    public function pointRetrait(): BelongsTo
    {
        return $this->belongsTo(PointRetrait::class,'point_retrait_id');
    }
    public function optionVentes(): BelongsToMany
    {
      
        return $this->belongsToMany(OptionVente::class,
        'vente_option_ventes','option_vente_id','vente_id')
        ->withTimestamps();
    }
}
