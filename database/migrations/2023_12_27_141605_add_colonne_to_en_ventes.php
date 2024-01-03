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
            $table->string('delai_livraison')->nullable()->after('prix_vente');
            $table->string('duree_garantie')->nullable()->after('delai_livraison');
            $table->date('date_debut_vente')->nullable()->after('duree_garantie');
            $table->date('date_vente_vente')->nullable()->after('date_debut_vente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('en_ventes', function (Blueprint $table) {
            //
        });
    }
};
