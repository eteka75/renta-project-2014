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
            $table->unsignedBigInteger('user_add_id')->nullable()->after('fichier');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('controle_voitures', function (Blueprint $table) {
            //
        });
    }
};
