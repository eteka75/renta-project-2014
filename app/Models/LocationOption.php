<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LocationOption extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'location_options';
    protected $fillable = [
        'nom',
        'photo',
        'tarif_option_heure',
        'tarif_option_journalier',
        'tarif_option_hebdomadaire',
        'tarif_option_mensuel',
        'description',
    ];

}
