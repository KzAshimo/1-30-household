<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeLog extends Model
{
    use HasFactory;

    protected $table = 'income_log';
    protected $fillable = ['name','text','price','category_id','user_id'];

    //ユーザとリレーション(子、複数)
    public function users()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    //カテゴリとリレーション(親)
    public function categories()
    {
        return $this->belongsTo(IncomeCategory::class,'category_log');
    }
}
