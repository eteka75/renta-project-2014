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
        Schema::table('achats', function (Blueprint $table) {
           /* if (Schema::hasColumn('achats', 'user_id')) {
                $table->dropForeign(['user_id']);
                //$table->dropColumn('user_id');
            }
            if (Schema::hasColumn('achats', 'point_id')) {
                $table->dropColumn('point_id');
            }
            if (Schema::hasColumn('achats', 'location')) {
                $table->dropColumn('location');
            }
            if (Schema::hasColumn('achats', 'en_vente_id')) {
                $table->dropColumn('en_vente_id');
            }
            if (Schema::hasColumn('achats', 'code_achat')) {
                $table->dropColumn('code_achat');
            }
            */
            //$table->string('code_achat')->after('client_id');
            //$table->string('code_achat')->index()->unique()->after('en_vente_ids');*/
            /*$table->string('en_vente_ids')->after('en_vente_id');
            $table->string('voiture_ids')->after('en_vente_ids');
            $table->bigInteger('total')->after('voiture_ids');
            $table->longText('infos')->after('total')->nullable();*/
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('achats', function (Blueprint $table) {
            $table->dropIfExists('code_achat');
            $table->dropForeign(['user_id']);
            $table->dropColumn('en_vente_ids');
            $table->dropColumn('voiture_ids');
            $table->dropColumn('total');
            $table->dropColumn('infos');   
        });
    }
};
