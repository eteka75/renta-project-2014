<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PointRetrait extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'point_retraits';
    protected $fillable = [
        'lieu',
        'ville',
        'quartier',
        'contacts',
        'adresse',
        'map_local',
        'photo',
        'description',
    ];
    public function Locations(): BelongsToMany
    {
        return $this->belongsToMany(EnLocation::class,
        'location_point_retraits','point_retrait_id','location_id')
        ->withTimestamps();
    }
}
