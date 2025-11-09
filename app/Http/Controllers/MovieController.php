<?php

namespace App\Http\Controllers;

use App\Services\MovieRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    public function __construct(
        protected MovieRepository $movies
    ) {}

    public function index(Request $request): Response
    {
        $query = $request->get('q');
        
        if ($query) {
            $data = $this->movies
                ->cached()
                ->search($query, ['page' => $request->get('page', 1)]);
            
            $movies = collect($data['results'] ?? []);
        } else {
            $movies = $this->movies
                ->cached()
                ->paginate(20, $request->get('page', 1), 'popular');
        }

        return Inertia::render('welcome', [
            'movies' => $movies,
            'query' => $query,
        ]);
    }

    public function show(int $id): Response
    {
        $movie = $this->movies
            ->cached()
            ->persisted()
            ->withCredits($id);

        // Optionally sync to local DB
        // $this->movies->syncToLocal($id);

        return Inertia::render('Movies/Show', [
            'movie' => $movie,
        ]);
    }

    public function popular(): Response
    {
        $movies = $this->movies
            ->cached(7200)
            ->popular();

        return Inertia::render('Movies/Popular', [
            'movies' => $movies['results'] ?? [],
        ]);
    }

    public function nowPlaying(): Response
    {
        $movies = $this->movies
            ->cached(3600)
            ->nowPlaying();

        return Inertia::render('Movies/NowPlaying', [
            'movies' => $movies['results'] ?? [],
        ]);
    }
}