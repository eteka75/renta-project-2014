<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WebPage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'web_pages';

    protected $fillable = [
        'nom',  
        'titre', 
        'photo', 
        'slug', 
        'contenu' 
    ];
}
