<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnLocation extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'en_locations';
    protected $fillable = [
        'voiture_id',
        'tarif_location_heure',
        'tarif_location_journalier',
        'tarif_location_hebdomadaire',
        'tarif_location_mensuel',
        'date_debut_location',
        'date_fin_location',
        'conditions',
        'description',
        'etat',
    ];

    public function voiture(): BelongsTo
    {
        return $this->belongsTo(Voiture::class,'voiture_id');
    }
    public function pointsRetrait(): BelongsToMany
    {
        return $this->belongsToMany(PointRetrait::class,
        'location_point_retraits','point_retrait_id','location_id')
        ->withTimestamps();
    }

    static public function getRandom($nb=10,$id){
        return EnLocation::where('etat',1)->where('id','!=',$id)->inRandomOrder()->limit($nb)->get();
    }
}
