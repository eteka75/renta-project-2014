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
        Schema::table('en_ventes', function (Blueprint $table) {
            $table->string('prix_defaut')->nullable()->after('prix_vente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('en_ventes', function (Blueprint $table) {
            $table->dropColumn('prix_defaut');
        });
    }
};
