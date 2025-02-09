<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenditureCategory extends Model
{
    use HasFactory;

    protected $table = 'expenditure_category';
    protected $fillable = ['title', 'user_id'];

    //ユーザーとリレーション(子、複数)
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    //支出ログとリレーション(親)
    public function logs()
    {
        return $this->hasMany(ExpenditureLog::class,'category_id');
    }
}
