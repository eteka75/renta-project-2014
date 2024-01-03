<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WebInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'web_infos';

    protected $fillable = [  
        'titre', 
        'code', 
        'photo', 
        'contenu' 
    ];

    protected function contenu(): Attribute
{
    return Attribute::make(
        get: fn ($value) => nl2br($value),
    );
}
}
