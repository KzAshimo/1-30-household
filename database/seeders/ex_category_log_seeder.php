<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ex_category_log_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('expenditure_log')->insert([
            'name' => 'すき家',
            'text' => '牛丼',
            'category_id' => '1',
            'price' => '500',
            'user_id' => '1'
        ]);
    }
}
