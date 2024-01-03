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
        Schema::create('ventes', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('transaction_id')->index();
            $table->unsignedBigInteger('voiture_id')->index();
            $table->text('infos_vente')->nullable();
            $table->integer('montant_location');
           
            
            $table->timestamps();
            $table->softDeletes();            

            $table->foreign('transaction_id')->references('id')->on('transactions');
            $table->foreign('voiture_id')->references('id')->on('voitures');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
