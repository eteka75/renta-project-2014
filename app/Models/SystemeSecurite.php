<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class SystemeSecurite extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'systeme_securites';

    protected $fillable = [
        'nom',
        'description',
        'photo'
    ];

    public function Voitures(): BelongsToMany
    {
        return $this->belongsToMany(Voiture::class,
        'voiture_has_sys_sec','voiture_id','systeme_securite_id')
        ->withTimestamps();
    }
}
