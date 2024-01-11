<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Favori extends Model
{
    use HasFactory;
    protected $table = 'favoris';
    protected $fillable = [
        'location_id',
        'achat_id',
        'type',
        'user_id'
    ];

    public function achats()
    {
        return $this->belongsTo(EnVente::class,'achat_id','id');
    }
    public function locations() 
    {
        return $this->belongsTo(EnLocation::class,'location_id','id');
    }
}
