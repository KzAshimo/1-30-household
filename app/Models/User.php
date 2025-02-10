<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //支出カテゴリとリレーション(親)
    public function ex_categories()
    {
        return $this->hasMany(ExpenditureCategory::class,'user_id');
    }

    //支出ログとリレーション(親)
    public function ex_logs()
    {
        return $this->hasMany(ExpenditureLog::class,'user_id');
    }

    //支出カテゴリとリレーション(親)
    public function in_categories()
    {
        return $this->hasMany(IncomeCategory::class,'user_id');
    }

    //支出ログとリレーション(親)
    public function in_logs()
    {
        return $this->hasMany(IncomeLog::class,'user_id');
    }
}
