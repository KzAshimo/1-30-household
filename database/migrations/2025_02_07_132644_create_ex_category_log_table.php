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
        Schema::create('ex_category_log', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('category_id')->unsigned()->index();
            $table->bigInteger('log_id')->unsigned()->index();
            $table->timestamps();

            //外部キー制約
            $table->foreign('category_id')->references('id')->on('expenditure_category')->onDelete('cascade');
            $table->foreign('log_id')->references('id')->on('expenditure_log')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ex_category_log');
    }
};
