<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AchatTransaction extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'achat_transactions';

    protected $fillable = [       
        "achat_id",
        "code_achat",
        "montant",
        "frais",
        "client_id",
        "status",
        "frais",
        "montant",
        "etat",
        "data",
        "achats",
    ];
      
    public function getAchat(): BelongsTo
    {      
        return $this->belongsTo(Achat::class,'achat_id','id');
    }
    public function user()
    {
        return $this->belongsTo(User::class,'client_id','id');
    }

}
