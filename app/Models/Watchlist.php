<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
     protected $fillable = [
        'user_id',
        'tmdb_id',
        'title',
        'poster_path',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
        'tmdb_id' => 'integer',
    ];

    public function getOverviewAttribute(): ?string
    {
        return $this->meta['overview'] ?? null;
    }

    public function getReleaseDateAttribute(): ?string
    {
        return $this->meta['release_date'] ?? null;
    }

    public function getVoteAverageAttribute(): ?float
    {
        return $this->meta['vote_average'] ?? null;
    }

    public function getPosterUrlAttribute(): ?string
    {
        if (!$this->poster_path) return null;
        return config('services.tmdb.image_base') . $this->poster_path;
    }
}
