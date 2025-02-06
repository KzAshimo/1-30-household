<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExpenditureCategory;
use Illuminate\Support\Facades\Auth;

class ExpenditureCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //支出カテゴリ一覧表示-------------------------
    public function index()
    {
        return response()->json(ExpenditureCategory::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    //支出カテゴリ登録----------------------------
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:expenditure_category,title',
        ]);

        $category = ExpenditureCategory::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);

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
    //支出カテゴリ削除------------------------------
    public function destroy(string $id)
    {
        //対象カテゴリをidで検索
        $category = ExpenditureCategory::find($id);

        //カテゴリーが存在しない or 登録したユーザー以外がリクエストした場合
        if(!$category || $category->user_id !== Auth::id()){
            return response()->json(['message' => 'Not Found'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
