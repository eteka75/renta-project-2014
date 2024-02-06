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
        Schema::create('voiture_achats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('voiture_id');
            $table->unsignedBigInteger('achat_id');

            $table->foreign('voiture_id')->references('id')->on('voitures')->onDelete('cascade');
            $table->foreign('achat_id')->references('id')->on('achats')->onDelete('cascade');
       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voiture_achats');
    }
};
