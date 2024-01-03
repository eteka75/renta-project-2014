<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ControlVoiture extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'controle_voitures';
    protected $fillable = [
        'voiture_id',
        'nom_controle',
        'date_controle',
        'organisme_controle',
        'kilometrage',
        'description',
        'fichier',
    ];

    public function voiture(): BelongsTo
    {
        return $this->belongsTo(Voiture::class,'voiture_id');
    }
}
