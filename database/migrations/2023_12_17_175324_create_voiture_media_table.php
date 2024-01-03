<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     */
     /*$table->integer('tarif_location_heure')->default(0);
        $table->integer('tarif_location_journalier')->default(0);
        $table->integer('tarif_location_hebdomadaire')->default(0);
        */
    public function up(): void
    {
        Schema::create('voiture_media', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('media_id')->unsigned()->index();
            $table->bigInteger('voiture_id')->unsigned()->index();
            
            $table->timestamps();           

            $table->unique(['media_id','voiture_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voiture_media');
    }
};
