<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenditureCategory extends Model
{
    protected $table = 'expenditure_category';
    protected $fillable = ['title','user_id'];

    public function user()
    {
        //Userクラスと1対多（多）
        return $this->belongsTo(User::class);
    }
}
