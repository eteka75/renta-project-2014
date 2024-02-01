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
        Schema::create('achat_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code_achat');            
            $table->unsignedBigInteger('montant');
            $table->unsignedBigInteger('frais');
            $table->unsignedBigInteger('client_id');
            $table->string('status');
            $table->text('data');
            $table->tinyInteger('etat');            
            $table->unsignedBigInteger('achat_id');
            $table->longText('achats');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achat_transactions');
    }
};
