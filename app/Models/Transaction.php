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
        "reservation_id",
        "client_id",
        "date_transaction",
        "voiture_id",
        "type",
        "status",
        "frais",
        "montant",
        "code_reservation",
        "etat",
        "data",
        "reservation",
    ];
      
    public function getReservation(): BelongsTo
    {      
        return $this->belongsTo(Reservation::class,'reservation_id','id');
    }
    public function user()
    {
        return $this->belongsTo(User::class,'client_id','id');
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
