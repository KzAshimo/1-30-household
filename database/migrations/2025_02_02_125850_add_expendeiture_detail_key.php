<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('expenditure_detail', function (Blueprint $table) {
            //外部キー結合
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('log_id')->references('id')->on('expenditure_log')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('expenditure_category')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditure_detail');
    }
};
