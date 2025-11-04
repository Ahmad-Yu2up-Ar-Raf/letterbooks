<?php

namespace App\Services;
use Illuminate\Support\Str;
use App\Models\Products;
use App\Models\Watchlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class WatchlistService
{

    private ?array $cachedWatchlist = null;
    /**
     * Create a new class instance.
     */



    protected const COOKIE_NAME = 'WatchlistItems';


    protected const COOKIE_LIFETIME = 60 * 24 * 365;
    /**
     * Create a new class instance.
     */
    public function addItemToWatchlist (int $movie)
    {
    
    
        if (Auth::check()) {
            $this->saveItemToDatabase($movie->id);
        } else {
            $this->saveItemToCookies($movie->id);
        }
    }
    
    public function removeItemFromWatchlist (int $movieId )
    {
        if(Auth::check()){
            $this->removeItemFromDatabase($movieId );
           }else{
            $this->removeItemFromCookies($movieId);
           }
    }
    
    public function getWatchlistFromDatabase() : array
    {
        $userId = Auth::id();
        $WatchlistItems = Watchlist::where('user_id', $userId)->orderBy('created_at', 'desc') ->get()->map(function ($watchlistItem) {
            return [
                'id' => $watchlistItem->id,
                'movie_id' => $watchlistItem->movie_id,
           
            ];
        })->toArray();


        return $WatchlistItems;
    }
    public function getWatchlistFromCookies(): array
    {
        $WatchlistItems = json_decode(Cookie::get(self::COOKIE_NAME, '[]') , true);

        return $WatchlistItems;
    }


    public function saveItemToDatabase(int $movieId, ): void
    {
        $userId = Auth::id();
        
        $watchlistItem = Watchlist::where('user_id', $userId)
            ->where('movie_id', $movieId)
            ->first();

        if ($watchlistItem) {
            $movie = Products::find($movieId);
            
            if ($movie) {
                
                // ✅ PENTING: Update quantity dan price sekaligus
                $watchlistItem->delete();
                
                Log::info('Watchlist Item removed', [
                    'watchlist_id' => $watchlistItem->id,
                    'movie_id' => $movieId,
                 
                ]);
            }
        } else {
            // ✅ Item baru - create
            Watchlist::create([
                'user_id' => $userId,
                'movie_id' => $movieId,
            ]);
            
            Log::info('Watchlist Item created', [
                'movie_id' => $movieId,
            ]);
        }
    }

    public function saveItemToCookies(int $movieId ): void
    {



        $WatchlistItems =  $this->getWatchlistFromCookies();
  
        $itemKey = $movieId;

        if(isset($WatchlistItems[$itemKey])){
            unset($watchlistItems[$itemKey]);
        }else{
            $WatchlistItems[$itemKey] = [
                'id' => Str::uuid(),
                'movie_id' => $movieId,
             

            ];
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($WatchlistItems), self::COOKIE_LIFETIME);
    }

    public function removeItemFromDatabase(int $movieId): void
    {
        $userId = Auth::id();
         Watchlist::where('user_id', $userId)->where('movie_id', $movieId)->delete();
    }

    

    public function removeItemFromCookies(int $movieId ): void
    {
        $watchlistItems = $this->getWatchlistFromCookies();


        $watchlistKey = $movieId;

        unset($watchlistItems[$watchlistKey]);

        Cookie::queue(self::COOKIE_NAME, json_encode($watchlistItems), self::COOKIE_LIFETIME);
    }

    public function getWatchlist(): array
    {
        try {
            if ($this->cachedWatchlist === null) {
                $WatchlistItemsRaw = Auth::check()
                    ? $this->getWatchlistFromDatabase()
                    : $this->getWatchlistFromCookies();
    
                // pastikan array
                $WatchlistItemsRaw = $WatchlistItemsRaw ?? [];
    
                // ambil semua movie_id yang valid
                $movieIds = collect($WatchlistItemsRaw)
                    ->pluck('movie_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->all();
    
                $movies = Products::whereIn('id', $movieIds)
                    ->with('vendor')
                    ->forWebsite()
                    ->get()
                    ->keyBy('id');
    
                $watchlistItemData = [];
    
                foreach ($WatchlistItemsRaw as $raw) {
                    // raw mungkin associative array from cookies or DB record with keys
                    $movieId = isset($raw['movie_id']) ? (int) $raw['movie_id'] : null;
                    if (! $movieId) continue;
    
                    $movieModel = $movies->get($movieId);
                    if (! $movieModel) continue; // produk sudah tidak ada / tidak published
    


    
                    $watchlistItemData[] = [
                        'id' => $raw['id'] ?? (string) Str::uuid(),
                        'movie_id' => $movieModel->id,
                        'movie' => $movieModel->toArray(),
                        'vendor' => $movieModel->vendor ? $movieModel->vendor->toArray() : null,
                    ];
                }
    
                $this->cachedWatchlist = $watchlistItemData;
            }
    
            return $this->cachedWatchlist;
        } catch (\Throwable $e) {
            // jangan swallow — log & rethrow (atau return empty array tergantung kebijakan)
            Log::error('Watchlist Service::getWatchlist error: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return [];
        }
    }



    public function moveWatchlistToDatabase($userId): void
    {
        $watchlistItems = $this->getWatchlistFromCookies();

        foreach($watchlistItems as $itemKey => $watchlistItem){
            $existingItem = Watchlist::where('user_id', $userId)
            ->where('movie_id', $watchlistItem['movie_id'])->first();


            if (!$existingItem) {
                Watchlist::create([
                    'user_id' => $userId,
                    'movie_id' => $watchlistItem['movie_id'],
                ]);
            }
        }

        Cookie::queue(self::COOKIE_NAME, '', -1);
    }
}
