<?php

use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MovieController;

Route::get('/', [MovieController::class, 'index'])->name('movies.index');
Route::get('/movies/popular', [MovieController::class, 'popular'])->name('movies.popular');
Route::get('/movies/now-playing', [MovieController::class, 'nowPlaying'])->name('movies.nowPlaying');
Route::get('/movies/{id}', [MovieController::class, 'show'])->name('movies.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
