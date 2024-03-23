<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'lesnotifications';

    protected $fillable = [
        'message',
        'lien',
        'type',
        'archived_at',
        'read_at',
    ];
   
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('read')->withTimestamps();
    }

    public function scopeAdmin($query){
        return $query->where('type',"ADMIN")->where('archived_at',null);
    }
    public function scopeArchived($query){
        return $query->where('type',"ADMIN")->where('archived_at','<>',null);
    }
}
