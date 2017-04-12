<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProduitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('salle_id')->nullable();

            $table->foreign('salle_id')
                ->references('id')->on('salles')
                ->onDelete('cascade')
                ->inUpdate('cascade'); //no action, cascade, set null, restrict

            $table->dateTime('date_arrivee');
            $table->dateTime('date_depart');
            $table->float('prix');
            $table->enum('etat', ['libre', 'reservation']);
            $table->timestamps();

            Schema::enableForeignKeyConstraints();//activer les contraintes d'intégrité
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints(); // desactive les contraintes d'integrité
        Schema::dropIfExists('produits');
    }
}
