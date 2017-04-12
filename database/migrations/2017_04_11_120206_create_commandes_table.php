<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommandesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('restrict')
                ->inUpdate('cascade'); //no action, cascade, set null, restrict

            $table->unsignedInteger('produit_id')
                    ->nullable();

            $table->foreign('produit_id')
                ->references('id')->on('produits')
                ->onDelete('restrict')
                ->inUpdate('cascade'); //no action, cascade, set null, restrict

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
        Schema::dropIfExists('commandes');
    }
}
