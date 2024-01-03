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
        Schema::create('location_point_retraits', function (Blueprint $table) { 
            $table->id();     
            $table->unsignedBigInteger('location_id')->index("i2");          
            $table->unsignedBigInteger('point_retrait_id')->index("i1");
           // $table->unique(array('point_retrait_id', 'location_id','created_at')); 
            $table->timestamps();
            //$table->primary(array('point_retrait_id', 'location_id','created_at')); 
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_point_retraits');        
    }
};
