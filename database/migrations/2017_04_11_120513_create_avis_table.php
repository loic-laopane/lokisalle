<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAvisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avis', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('set null')
                ->inUpdate('cascade'); //no action, cascade, set null, restrict

            $table->integer('salle_id')->unsigned()->nullable();
            $table->foreign('salle_id')
                ->references('id')->on('salles')
                ->onDelete('cascade')
                ->inUpdate('cascade'); //no action, cascade, set null, restrict

            $table->text('commentaire')->nullable();
            $table->unsignedTinyInteger('note')->nullable();
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
        Schema::dropIfExists('avis');
    }
}
