<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSallesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titre', 255)
                    ->nullable()
                    ->comment('Titre de la salle');

            $table->text('description')
                ->nullable();
            $table->string('photo', 255)
                ->nullable();
            $table->string('pays', 255)
                ->nullable();
            $table->string('ville', 255)
                ->nullable();
            $table->string('adresse', 255)
                ->nullable();
            $table->string('cp',10)
                ->nullable();
            $table->unsignedInteger('capacite')
                ->nullable();
            $table->enum('categorie', ['reunion', 'bureau', 'formation'])
                ->default('reunion');

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
        Schema::dropIfExists('salles');
    }
}
