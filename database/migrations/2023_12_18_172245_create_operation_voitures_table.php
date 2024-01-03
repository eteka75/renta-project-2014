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
        Schema::create('operation_voitures', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voiture_id')->unsigned()->index();
            $table->string('nom_operation');
            $table->date('date_operation');
            $table->integer('kilometrage');
            $table->longtext('description');
            $table->string('fichier');           
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('voiture_id')->references('id')->on('voitures');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operation_voitures');
    }
};
