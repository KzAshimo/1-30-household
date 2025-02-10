<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncomeCategoryRequest;
use App\Models\IncomeCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(IncomeCategory::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncomeCategoryRequest $request)
    {
        $category = IncomeCategory::create($request->validated());
        return response()->json($category, 201);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = IncomeCategory::find($id);

        if(!$category || $category->user_id !== Auth::id()){
            return response()->json(['message' => 'Not Found'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
