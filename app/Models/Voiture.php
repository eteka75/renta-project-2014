<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voiture extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        "nom",
        "photo",
        "annee_fabrication",
        "volume_coffre",
        "description",
        "date_achat",
        "couleur",
        "user_add_id",
        "disponibilite",
        "puissance_moteur",
        "type_transmission",
        "dimenssions",
        "nombre_vitesse",
        "nombre_place",
        "nombre_portes",
        "immatriculation",
        "consommation",
        "capacite_reservoir",
        "emission_co2",
        "type_eclairage",
        "type_suspenssion",
        "technologies_a_bord",
        "nombre_petite_valise",
        "nombre_grande_valise",
        "etat",
        "marque_id",
        "categorie_id",
        "type_carburant_id",
    ];
    


    public function marque(): BelongsTo
    {
        return $this->belongsTo(Marque::class,'marque_id');
    }
 
    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class,'categorie_id');
    }
    public function type_carburant(): BelongsTo
    {
        return $this->belongsTo(TypeCarburant::class,'type_carburant_id');
    }

    public function systemeSecurites(): BelongsToMany
    {
        return $this->belongsToMany(SystemeSecurite::class,
        'voiture_has_sys_sec','systeme_securite_id','voiture_id')
        ->withTimestamps();
    }
    public function medias(): BelongsToMany
    {      
        return $this->belongsToMany(Media::class,
        'voiture_media','voiture_id','media_id')
        ->withTimestamps();
    }
    public function locationMedias(): BelongsToMany
    {      
        return $this->belongsToMany(Media::class,
        'en_location_media','voiture_id','media_id')
        ->withTimestamps();
    }
    public function controlesTechniques(): BelongsTo
    {
        return $this->belongsTo(ControlVoiture::class);
    }
    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Voiture::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
