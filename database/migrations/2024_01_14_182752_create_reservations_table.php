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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('voiture_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('point_id');
            $table->unsignedBigInteger('pays_id');
            $table->text('location');
            $table->string('nom_complet');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin');
            $table->unsignedBigInteger('montant');
            $table->unsignedBigInteger('tva');
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('type_piece_identite')->nullable();
            $table->string('numero_piece_identite')->nullable();
            $table->string('numero_permis')->nullable();
            $table->string('adresse_residence')->nullable();
            $table->string('ville_residence')->nullable();
            $table->date('date_expiration_permis')->nullable();
            $table->boolean('etat')->default(0);
            $table->unsignedTinyInteger('nb_annee_conduite')->nullable()->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
