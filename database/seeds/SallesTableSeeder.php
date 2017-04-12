<?php

use Illuminate\Database\Seeder;

class SallesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(App\Salle::class, 8)->create();
    }
}
