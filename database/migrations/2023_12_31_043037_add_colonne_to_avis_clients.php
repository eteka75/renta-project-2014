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
        Schema::table('avis_clients', function (Blueprint $table) {
            $table->tinyInteger('nombre_etoile')->default(0)->after('profession');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('avis_clients', function (Blueprint $table) {
            $table->dropColumn('nombre_etoile');
        });
    }
};
