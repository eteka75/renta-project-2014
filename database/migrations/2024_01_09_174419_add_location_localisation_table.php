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
        Schema::create('location_localisation', function (Blueprint $table) {
            $table->unsignedBigInteger('en_location_id')->index();
            $table->unsignedBigInteger('localisation_id')->index();

            $table->foreign('en_location_id')->references('id')
                 ->on('en_locations')->onDelete('cascade');
            $table->foreign('localisation_id')->references('id')
                 ->on('localisations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_localisation');
    }
};
