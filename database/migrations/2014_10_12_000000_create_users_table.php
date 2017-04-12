<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('pseudo', 255);
            $table->string('password', 255);
            $table->string('nom', 255);
            $table->string('prenom', 255);
            $table->string('email', 255)->unique();
            $table->enum('civilite', ['m', 'f'])
                    ->default('m');
            $table->unsignedTinyInteger('statut')
                    ->default(1);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
