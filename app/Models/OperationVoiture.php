<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperationVoiture extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'operation_voitures';
    protected $fillable = [
        'voiture_id',
        'nom_operation',
        'prix_operation',
        'responsable_operation',
        'date_operation',
        'kilometrage',
        'description',
        'fichier',
    ];

    public function voiture(): BelongsTo
    {
        return $this->belongsTo(Voiture::class,'voiture_id','id');
    }
}
