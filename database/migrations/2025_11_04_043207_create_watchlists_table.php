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
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
             $table->unsignedBigInteger('tmdb_id')->unique();
                   $table->string('poster_path')->nullable();
            $table->json('meta')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unique(['user_id', 'tmdb_id']);
            $table->index('tmdb_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watchlists');
    }
};
