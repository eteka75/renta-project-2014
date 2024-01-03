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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable(false)->change();;
            $table->string('prenom');
            $table->enum('sexe', ['M','F',''])->default('');
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->default('');
            $table->string('ville_residence')->default('');
            $table->string('adresse')->default('');
            $table->string('fichier_identite1')->default('');
            $table->string('fichier_identite2')->default('');
            $table->string('fichier_identite3')->default('');
            $table->longText('description')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('pays_id')->index();

            $table->foreign('pays_id')->references('id')->on('pays');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
