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
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->string('division')->nullable();
            $table->dateTime('date_transaction');
            $table->integer('montant');
            $table->enum('type',["L","A",'R']);
            
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('voiture_id');

            $table->timestamps();
            $table->softDeletes();

            $table->index('client_id','voiture_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('voiture_id')->references('id')->on('voitures');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
