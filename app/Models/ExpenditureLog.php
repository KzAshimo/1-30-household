<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenditureLog extends Model
{
    protected $table = 'expenditure_log';
    protected $fillable = ['name', 'text', 'price', 'category_id'];

    //ユーザーとリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //カテゴリーとリレーション(中間テーブル使用)
    public function category()
    {
        return $this->belongsToMany(ExpenditureCategory::class, 'ex_category_log', 'category_id', 'log_id',)
            ->withPivot('user_id')->withTimestamps();
    }
}
