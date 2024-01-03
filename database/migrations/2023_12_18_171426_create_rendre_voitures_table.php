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
        Schema::create('rendre_voitures', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('voiture_id')->index();
            $table->unsignedBigInteger('transaction_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('nom_agent');
            $table->dateTime('date_remise');
            $table->longtext('observations');
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('voiture_id')->references('id')->on('voitures');
            $table->foreign('transaction_id')->references('id')->on('transactions');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendre_voitures');
    }
};
