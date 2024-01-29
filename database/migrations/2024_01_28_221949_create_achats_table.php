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
        Schema::create('achats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('en_vente_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('code_achat')->unique('code_achat');
            $table->unsignedBigInteger('point_id');
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('pays_id');
            $table->text('location')->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->nullable();
            $table->string('telephone')->nullable();
            $table->unsignedBigInteger('montant');
            $table->unsignedBigInteger('tva');
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('type_piece_identite')->nullable();
            $table->string('numero_piece_identite')->nullable();
            $table->string('adresse_residence')->nullable();
            $table->string('ville_residence')->nullable();
            $table->boolean('etat')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achats');
    }
};
