<?php

namespace App\Http\Controllers;

use App\Models\IncomeLog;
use Illuminate\Http\Request;
use App\Http\Requests\StoreIncomeLogRequest;
use App\Http\Requests\UpdateIncomeLogRequest;

class IncomeLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $log = IncomeLog::with('users:id,name')->get();

        return response()->json($log, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomeLogRequest $request)
    {
        $logs = IncomeLog::create([
            'name' => $request['name'],
            'text' => $request['text'],
            'price' => $request['price'],
            'category_id' => $request['category_id'],
            'user_id' => $request['user_id'],
        ]);

        return response()->json($logs, 201);
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
    public function update(UpdateIncomeLogRequest $request, string $id)
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
