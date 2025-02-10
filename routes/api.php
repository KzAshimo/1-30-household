<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ExpenditureCategoryController;
use App\Http\Controllers\ExpenditureLogController;
use App\Http\Controllers\IncomeCategoryController;
use App\Http\Controllers\IncomeLogController;
use App\Models\ExpenditureLog;

//api
    //支出カテゴリ
    Route::get('/ex-categories',[ExpenditureCategoryController::class,'index']);
    Route::post('/ex-categories',[ExpenditureCategoryController::class,'store']);
    Route::delete('/ex-categories/{id}',[ExpenditureCategoryController::class,'destroy']);
    //支出ログ
    route::post('/ex-logs',[ExpenditureLogController::class,'store']);
    route::put('ex-logs/{id}',[ExpenditureLogController::class,'update']);
    route::delete('ex-logs/{id}',[ExpenditureLogController::class,'destroy']);

    //収入カテゴリ
    Route::get('/in-categories',[IncomeCategoryController::class,'index']);
    Route::post('/in-categories',[IncomeCategoryController::class,'store']);
    Route::delete('/in-categories/{id}',[IncomeCategoryController::class,'destroy']);
    //収入ログ
    Route::post('/in-logs',[IncomeLogController::class,'store']);
    Route::put('/in-logs/{id}',[IncomeLogController::class,'update']);
    Route::delete('/in-logs/{id}',[IncomeLogController::class,'destroy']);