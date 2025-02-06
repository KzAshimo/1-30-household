<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenditureLogRequest;
use App\Http\Requests\UpdateExpenditureLogRequest;
use App\Models\ExpenditureLog;
use Illuminate\Http\Request;

class ExpenditureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    //支出登録
    public function store(StoreExpenditureLogRequest $request)
    {
        $log = ExpenditureLog::create($request->validated());
        return response()->json($log,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    //支出編集
    public function update(UpdateExpenditureLogRequest $request, string $id)
    {
        $log = ExpenditureLog::find($id);
        if(!$log){
            return response()->json(['message' => 'Not found'], 404);
        }

        $log->update($request->validated());
        return response()->json($log, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    //支出削除
    public function destroy(string $id)
    {
        $log = ExpenditureLog::find($id);
        if(!$log)
        {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $log->delete();
        return response()->json(['message' => 'deleted'], 200);
    }
}
