<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'media';
    protected $fillable = [
        'nom',
        'original_name',
        'url',
        'dossier',
        'description',
    ];
    public function voitures(): BelongsToMany
    {
      
        return $this->belongsToMany(Voiture::class,
        'voiture_media','voiture_id','media_id')
        ->withTimestamps();
    }
    public function locationVoitures(): BelongsToMany
    {      
        return $this->belongsToMany(Media::class,
        'en_location_media','voiture_id','media_id')
        ->withTimestamps();
    }

}
