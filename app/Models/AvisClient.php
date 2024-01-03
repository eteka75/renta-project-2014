<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AvisClient extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'avis_clients';

    protected $fillable = [
        'auteur',  
        'profession', 
        'message', 
        'nombre_etoile', 
        'actif', 
        'photo' 
    ];
}
