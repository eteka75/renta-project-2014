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
        Schema::create('marques', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pays_id')->unsigned()->index();
            $table->string('logo');
            $table->year('annee_fondation')->default(0000);
            $table->string('site_web')->nullable();
            $table->longText('description')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('pays_id')->references('id')->on('pays');//->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marques');
    }
};
