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
        Schema::create('location_reductions', function (Blueprint $table) {
            $table->id();
            $table->string('nom_reduction');
            $table->enum('type_reduction',['P','M','A'])->default('M');
            $table->string('code_reduction');
            $table->integer('montant_min_reduction')->default(0);
            $table->integer('montant_max_reduction')->default(0);
            $table->date('date_debut_reduction')->nullable();
            $table->date('date_fin_reduction')->nullable();
            $table->longText('description')->nullable(true);
            $table->integer('montant')->default(0);            
            $table->integer('pourcentage')->default(0); 
                       
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_reductions');
    }
};
