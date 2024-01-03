<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class OptionVente extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'option_ventes';
    protected $fillable = [
        'nom',
        'prix',
        'description',
        'photo'
    ];

    public function EnVentes(): BelongsToMany
    {      
        return $this->belongsToMany(EnVente::class,
        'vente_option_ventes','vente_id','option_vente_id')
        ->withTimestamps();
    }
}
