<?php

namespace App\Services;

use App\Models\Movie;
use Illuminate\Support\Facades\Cache;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class MovieRepository
{
    protected TmdbClient $client;
    protected ?int $cacheTtl = null;
    protected bool $usePersistentCache = false;

    public function __construct(TmdbClient $client)
    {
        $this->client = $client;
    }

    /**
     * Enable transient caching
     */
    public function cached(int $ttl = null): self
    {
        $this->cacheTtl = $ttl ?? config('services.tmdb.cache_ttl');
        return $this;
    }

    /**
     * Enable persistent DB caching
     */
    public function persisted(): self
    {
        $this->usePersistentCache = true;
        return $this;
    }

    /**
     * Get popular movies
     */
    public function popular(int $page = 1): array
    {
        return $this->cachedRequest("popular.{$page}", function () use ($page) {
            return $this->client->get('/movie/popular', ['page' => $page]);
        });
    }

    /**
     * Get now playing movies
     */
    public function nowPlaying(int $page = 1): array
    {
        return $this->cachedRequest("now_playing.{$page}", function () use ($page) {
            return $this->client->get('/movie/now_playing', ['page' => $page]);
        });
    }

    /**
     * Search movies
     */
    public function search(string $query, array $options = []): array
    {
        $page = $options['page'] ?? 1;
        $cacheKey = "search.{$query}.{$page}";

        return $this->cachedRequest($cacheKey, function () use ($query, $page) {
            return $this->client->get('/search/movie', [
                'query' => $query,
                'page' => $page,
            ]);
        });
    }

    /**
     * Find movie by TMDB ID
     */
    public function find(int $tmdbId): ?array
    {
        // Try persistent cache first
        if ($this->usePersistentCache) {
            $cached = Movie::where('tmdb_id', $tmdbId)->first();
            if ($cached) {
                return $this->formatMovie($cached->meta);
            }
        }

        return $this->cachedRequest("movie.{$tmdbId}", function () use ($tmdbId) {
            try {
                return $this->client->get("/movie/{$tmdbId}");
            } catch (\Exception $e) {
                // Fallback to local if API fails
                if ($this->usePersistentCache) {
                    $fallback = Movie::where('tmdb_id', $tmdbId)->first();
                    if ($fallback) return $this->formatMovie($fallback->meta);
                }
                throw $e;
            }
        });
    }

    /**
     * Get movie with credits
     */
    public function withCredits(int $tmdbId): ?array
    {
        return $this->cachedRequest("movie.{$tmdbId}.credits", function () use ($tmdbId) {
            return $this->client->get("/movie/{$tmdbId}", [
                'append_to_response' => 'credits',
            ]);
        });
    }

    /**
     * Get all movies (from endpoint)
     */
    public function all(string $endpoint = 'popular', int $page = 1): Collection
    {
        $data = match ($endpoint) {
            'popular' => $this->popular($page),
            'now_playing' => $this->nowPlaying($page),
            default => $this->popular($page),
        };

        return collect($data['results'] ?? [])->map(fn($item) => $this->formatMovie($item));
    }

    /**
     * Paginate movies
     */
    public function paginate(int $perPage = 20, int $page = 1, string $endpoint = 'popular'): LengthAwarePaginator
    {
        $data = match ($endpoint) {
            'popular' => $this->popular($page),
            'now_playing' => $this->nowPlaying($page),
            default => $this->popular($page),
        };

        $items = collect($data['results'] ?? [])->map(fn($item) => $this->formatMovie($item));

        return new LengthAwarePaginator(
            $items,
            $data['total_results'] ?? 0,
            $perPage,
            $page,
            ['path' => request()->url()]
        );
    }

    /**
     * Sync movie to local database
     */
    public function syncToLocal(int $tmdbId): Movie
    {
        $data = $this->find($tmdbId);

        return Movie::updateOrCreate(
            ['tmdb_id' => $tmdbId],
            [
                'title' => $data['title'],
                'poster_path' => $data['poster_path'],
                'meta' => $data,
            ]
        );
    }

    /**
     * Internal: cached request wrapper
     */
    protected function cachedRequest(string $key, callable $callback): ?array
    {
        $cacheKey = "tmdb.{$key}";

        if ($this->cacheTtl !== null) {
            return Cache::remember($cacheKey, $this->cacheTtl, $callback);
        }

        return $callback();
    }

    /**
     * Format movie data to standardized structure
     */
    protected function formatMovie(array $data): array
    {
        return [
            'tmdb_id' => $data['id'],
            'title' => $data['title'] ?? null,
            'overview' => $data['overview'] ?? null,
            'release_date' => $data['release_date'] ?? null,
            'poster_path' => $data['poster_path'] ?? null,
            'poster_url' => $data['poster_path'] 
                ? config('services.tmdb.image_base') . $data['poster_path']
                : null,
            'backdrop_path' => $data['backdrop_path'] ?? null,
            'vote_average' => $data['vote_average'] ?? null,
            'vote_count' => $data['vote_count'] ?? null,
            'popularity' => $data['popularity'] ?? null,
            'genres' => $data['genres'] ?? [],
            'credits' => $data['credits'] ?? null,
            'raw' => $data,
        ];
    }
}