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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
               $table->unsignedBigInteger('tmdb_id');
                   $table->string('poster_path')->nullable();
            $table->json('meta')->nullable();
            $table->longText('review')->nullable();
            $table->tinyInteger('star_rating');
            $table->boolean('rewatch')->default(false);
            $table->json('tags')->nullable()->comment('Array of string');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
