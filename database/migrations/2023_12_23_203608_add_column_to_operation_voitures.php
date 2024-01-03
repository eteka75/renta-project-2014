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
        Schema::table('operation_voitures', function (Blueprint $table) {
            $table->string('prix_operation')->nullable()->after('description');            
            $table->string('responsable_operation')->nullable()->after('prix_operation');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('operation_voitures', function (Blueprint $table) {
            //
        });
    }
};
