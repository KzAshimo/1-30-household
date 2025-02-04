<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenditureCategory extends Model
{
    use HasFactory;

    protected $table = 'expenditure_category';
    protected $fillable = ['title'];

    public function user()
    {
        //Userクラスと１対多（多）
        return $this->belongsTo(User::class);
    }
}
