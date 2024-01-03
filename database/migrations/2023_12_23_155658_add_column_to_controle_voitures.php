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
        Schema::table('controle_voitures', function (Blueprint $table) {
            $table->string('organisme_controle')->nullable()->after('nom_controle');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contole_voitures', function (Blueprint $table) {
            //
        });
    }
};
