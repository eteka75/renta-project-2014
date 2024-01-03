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
        Schema::create('user_has_conversations', function (Blueprint $table) {
            $table->id();
            $table->integer('conversation_id')->unsigned()->index();
            $table->integer('sender_id')->unsigned()->index();
            $table->integer('receiver_id')->unsigned()->index();
            $table->integer('messsage_id')->unsigned()->index();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_has_conversations');
    }
};
