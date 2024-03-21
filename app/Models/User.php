<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
//next Class
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'etat',
        'telephone',
        'role',
        'photo',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'etat' => 'boolean',
    ];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function fullname(){
        return $this->nom.' '.$this->prenom;
    }
    public function favoris(): HasMany
    {
        return $this->hasMany(Favori::class,'id','user_id');
    }
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
    public function achats(): HasMany
    {
        return $this->hasMany(Achat::class,'client_id','id');
    }
    public function client()
    {
        return $this->hasOne(Client::class);
    }
    public function notifications()
    {
        return $this->belongsToMany(Notification::class)->withPivot('read')->withTimestamps();
    }
    
    public function getAchatsWithVoitures($nbTransactionsPerPage=10)
    {
        return $this->achats()
        ->latest()
        ->whereHas('transaction')
        ->with('voitures')
        ->paginate($nbTransactionsPerPage);
    }
}
