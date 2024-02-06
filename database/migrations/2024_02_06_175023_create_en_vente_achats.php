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
        Schema::create('en_vente_achats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('en_vente_id');
            $table->unsignedBigInteger('achat_id');
            $table->unsignedBigInteger('prix');
            $table->foreign('achat_id')->references('id')->on('achats')->onDelete('cascade');
            $table->foreign('en_vente_id')->references('id')->on('en_ventes')->onDelete('cascade');
       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('en_vente_achats');
    }
};
