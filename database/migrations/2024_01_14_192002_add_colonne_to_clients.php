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
        Schema::table('clients', function (Blueprint $table) {
            $table->string('type_piece_identite')->after('ville_residence')->nullable();
            $table->string('numero_piece_identite')->nullable();
            $table->string('numero_permis')->nullable();
            $table->date('date_expiration_permis')->nullable();
            $table->unsignedTinyInteger('nb_annee_conduite')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn('type_piece_identite');
            $table->dropColumn('numero_piece_identite');
            $table->dropColumn('numero_permis');
            $table->dropColumn('date_expiration_permis');
            $table->dropColumn('nb_annee_conduite');
        });
    }
};
