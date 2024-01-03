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
        Schema::create('pays', function (Blueprint $table) {
            $table->id();
            $table->string('code')->default('');
            $table->string('alpha2');
            $table->string('alpha3');
            $table->string('nom_fr_fr')->nullable(false)->change();
            $table->string('nom_en_gb')->nullable(false)->change();

            $table->unique(['alpha2','alpha3']);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['code','alpha2','alpha3']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pays');
    }
};
