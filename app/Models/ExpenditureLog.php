<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenditureLog extends Model
{
    protected $table = 'expenditure_log';

    protected $fillable = ['name','text','price','category_id'];

    //カテゴリーとリレーション
    public function category()
    {
        return $this->belongsTo(ExpenditureCategory::class,'category_id');
    }
}
