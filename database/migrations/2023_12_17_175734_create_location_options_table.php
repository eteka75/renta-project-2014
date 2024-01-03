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
        Schema::create('location_options', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('photo');
            $table->string('description');
            $table->integer('tarif');
            
            $table->timestamps();
            $table->softDeletes();
            
           /* $table->integer('location_id')->unsigned()->index('voiture');
            $table->integer('location_option_id')->unsigned()->index('voiture');            
            
            $table->timestamps();

            $table->unique(['location_id','location_option_id']);
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('location_option_id')->references('id')->on('location_options');
           */
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_options');
    }
};
