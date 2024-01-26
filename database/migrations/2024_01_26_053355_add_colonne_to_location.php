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
        Schema::table('en_locations', function (Blueprint $table) {
            $table->text('lien_video')->nullable()->after('voiture_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('en_locations', function (Blueprint $table) {
            $table->dropColumn('lien_video');
        });
    }
};
