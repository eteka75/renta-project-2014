<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    use HasFactory;
    protected $fillable = [
        'pays',
        'nom_fr_fr',
        'nom_en',
        'code',
        'alpha2',
        'alpha3',
    ];
    public function marques(): HasMany
    {
        return $this->hasMany(Marque::class);
    }

}
