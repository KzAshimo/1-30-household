<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ExpenditureCategoryController;

//支出カテゴリーapi
Route::middleware('auth')->group(function(){
    Route::get('/ex-categories',[ExpenditureCategoryController::class,'index']);
    Route::post('/ex-categories',[ExpenditureCategoryController::class,'store']);
    Route::delete('/ex-categories/{id}',[ExpenditureCategoryController::class,'destroy']);
});
