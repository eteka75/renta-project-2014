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
            $table->integer('views')->nullable()->after('description');
            $table->string('instruction_retrait')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('en_locations', function (Blueprint $table) {
            $table->dropColumn('views');
        });
    }
};
