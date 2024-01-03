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
        Schema::create('administrateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable(false)->change();
            $table->string('prenom')->nullable();
            $table->string('poste')->nullable();
            $table->string('division')->nullable();
            $table->longText('biographie')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedBigInteger('user_id')->index();
            
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrateurs');
    }
};
