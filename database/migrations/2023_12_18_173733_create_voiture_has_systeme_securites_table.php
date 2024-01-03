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
        Schema::create('voiture_has_sys_sec', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('voiture_id')->nullable(false);
            $table->unsignedBigInteger('systeme_securite_id')->nullable(false);            
            
            $table->timestamps();

            $table->unique(['voiture_id','systeme_securite_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voiture_has_sys_sec');
    }
};
