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
        Schema::table('location_options', function (Blueprint $table) {
            $table->string('tarif_option_heure')->nullable()->after('nom');
            $table->integer('tarif_option_journalier')->nullable()->after('tarif_option_heure');
            $table->integer('tarif_option_hebdomadaire')->nullable()->after('tarif_option_journalier');
            $table->integer('tarif_option_mensuel')->nullable()->after('tarif_option_hebdomadaire');        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('location_options', function (Blueprint $table) {
            //
        });
    }
};
