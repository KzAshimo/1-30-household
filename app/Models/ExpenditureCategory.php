<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenditureCategory extends Model
{
    use HasFactory;

    protected $table = 'expenditure_category';
    protected $fillable = ['title', 'user_id'];

    //ユーザークラスとリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //支出記録とリレーション(中間テーブル使用)
    public function log()
    {
        return $this->belongsToMany(ExpenditureLog::class, 'ex_category_log', 'category_id', 'log_id')
            ->withPivot('user_id')->withTimestamps();
    }
}
