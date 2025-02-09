<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ExpenditureCategoryController;
use App\Http\Controllers\ExpenditureLogController;
use App\Models\ExpenditureLog;

//api
    //支出カテゴリ
    Route::get('/ex-categories',[ExpenditureCategoryController::class,'index']);
    Route::post('/ex-categories',[ExpenditureCategoryController::class,'store']);
    Route::delete('/ex-categories/{id}',[ExpenditureCategoryController::class,'destroy']);

    //支出履歴
    route::post('/ex-logs',[ExpenditureLogController::class,'store']);
    route::put('ex-logs/{id}',[ExpenditureLogController::class,'update']);
    route::delete('ex-logs/{id}',[ExpenditureLogController::class,'destroy']);