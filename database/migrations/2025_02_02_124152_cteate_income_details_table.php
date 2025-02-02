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
            Schema::create('income_detail', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('category_id')->unsigned()->index();
                $table->bigInteger('log_id')->unsigned()->index();
                $table->bigInteger('user_id')->unsigned()->index();
                $table->timestamps();
                //外部キー結合
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('log_id')->references('id')->on('income_log')->onDelete('cascade');
                $table->foreign('category_id')->references('id')->on('income_category')->onDelete('cascade');
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_detail');
    }
};
