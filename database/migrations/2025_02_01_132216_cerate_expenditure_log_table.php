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
        Schema::create('expenditure_log', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('text');
            $table->bigInteger('category_id')->unsigned()->index();
            $table->timestamps();
            //外部キー制約
            $table->foreign('category_id')->references('id')->on('expenditure_category')->onDelete('cascade');
        });

        Schema::table('expenditure_log', function (Blueprint $table) {
            $table->integer('price');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditure_log');
    }
};
