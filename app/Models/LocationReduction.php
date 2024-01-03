<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LocationReduction extends Model
{
    use HasFactory, SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'location_reductions';
    protected $fillable = [
        'nom',
        'type_reduction',
        'code_reduction',
        'montant_min_reduction',
        'montant_max_reduction',
        'date_debut_reduction',
        'date_fin_reduction',
        'pourcentage',
        'montant',
        'photo',
        'description',
    ];

}
