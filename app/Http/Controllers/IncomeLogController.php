<?php

namespace App\Http\Controllers;

use App\Models\IncomeLog;
use Illuminate\Http\Request;
use App\Http\Requests\StoreIncomelogRequest;
use App\Http\Requests\UpdateIncomelogRequest;

class IncomeLogController extends Controller
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
    public function store(StoreIncomelogRequest $request)
    {
        $log = IncomeLog::create($request->validated());
        return response()->json($log, 201);
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
    public function update(UpdateIncomelogRequest $request, string $id)
    {
        $log = IncomeLog::find($id);
        if(!$id){
            return response()->json(['message' => 'Not found'],404);
        }

        $log->update($request->validated());
        return response()->json($log, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $log = IncomeLog::find($id);
        if(!$log){
            return response()->json(['message' => 'Not found'], 404);
        }

        $log->delete();
        return response()->json(['message' => 'deleted'], 200);
    }
}
