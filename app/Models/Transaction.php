<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'transactions';

    protected $fillable = [       
        "date_transaction",
        "montant",
        "type",
        "client_id",
        "data",
        "status",
        "voiture_id",
        "reservation_id",
        "reservation",
        "etat"
    ];
      
    public function getReservation(): BelongsTo
    {      
        return $this->belongsTo(Reservation::class,'reservation_id','id');
    }
}
