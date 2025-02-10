<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenditureLog extends Model
{
    protected $table = 'expenditure_log';
    protected $fillable = ['name', 'text', 'price', 'category_id'];

    //ユーザーとリレーション(子、複数)
    public function users()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    //支出カテゴリーとリレーション(子、複数)
    public function categories()
    {
        return $this->belongsTo(ExpenditureCategory::class,'category_id');
    }
}
