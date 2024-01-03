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
        Schema::create('carte_bancaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom_carte');
            $table->string('nom_prenom');
            $table->string('num');
            $table->string('expire');
            $table->string('code');
            $table->string('infos');
            $table->text('redentials');
            $table->timestamps();
            
            $table->softDeletes();
            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carte_bancaires');
    }
};
