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
        Schema::table('voitures', function (Blueprint $table) {
            /*$table->string('puissance_moteur')->nullable()->after('disponibilite');
            $table->string('type_transmission')->nullable()->after('puissance_moteur');
            $table->string('dimenssions')->nullable()->after('type_transmission');
            $table->string('consommation')->nullable()->after('dimenssions');
            $table->string('capacite_reservoir')->nullable()->after('consommation');
            $table->string('emission_co2')->nullable()->after('capacite_reservoir');
            $table->string('type_eclairage')->nullable()->after('emission_co2');
            $table->string('type_suspenssion')->nullable()->after('type_eclairage');
            $table->text('technologies_a_bord')->nullable()->after('type_suspenssion');*/
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voitures', function (Blueprint $table) {
            //
        });
    }
};
