<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ExpenditureCategoryController;
use App\Http\Controllers\ExpenditureLogController;
use App\Http\Controllers\IncomeCategoryController;
use App\Http\Controllers\IncomeLogController;
use App\Models\ExpenditureLog;
use App\Models\IncomeLog;

//api
    //支出カテゴリ
    Route::get('/ex-categories',[ExpenditureCategoryController::class,'index']);
    Route::post('/ex-categories',[ExpenditureCategoryController::class,'store']);
    Route::delete('/ex-categories/{id}',[ExpenditureCategoryController::class,'destroy']);
    //支出ログ
    Route::get('/ex-logs',[ExpenditureLogController::class,'index']);
    Route::post('/ex-logs',[ExpenditureLogController::class,'store']);
    Route::put('/ex-logs/{id}',[ExpenditureLogController::class,'update']);
    Route::delete('/ex-logs/{id}',[ExpenditureLogController::class,'destroy']);

    //収入カテゴリ
    Route::get('/in-categories',[IncomeCategoryController::class,'index']);
    Route::post('/in-categories',[IncomeCategoryController::class,'store']);
    Route::delete('/in-categories/{id}',[IncomeCategoryController::class,'destroy']);
    //収入ログ
    Route::Get('/in-logs',[IncomeLogController::class,'index']);
    Route::post('/in-logs',[IncomeLogController::class,'store']);
    Route::put('/in-logs/{id}',[IncomeLogController::class,'update']);
    Route::delete('/in-logs/{id}',[IncomeLogController::class,'destroy']);

