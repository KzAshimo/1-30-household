<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeCategory extends Model
{
    use HasFactory;

    protected $table = 'income_category';
    protected $fillable = ['title','user_id'];

    //ユーザーとリレーション(子、複数)
    public function users()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    //収入ログとリレーション(親)
    public function logs()
    {
        return $this->hasMany(IncomeLog::class,'category_id');
    }
}
