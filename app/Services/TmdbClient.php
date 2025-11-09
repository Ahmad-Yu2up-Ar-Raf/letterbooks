<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class TmdbClient
{
    protected Client $client;
    protected string $apiKey;
    protected int $maxRetries = 3;

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key');
        
        // Pastikan base_uri selalu berakhir dengan /
        $baseUrl = rtrim(config('services.tmdb.base_url'), '/') . '/';
        
        $this->client = new Client([
            'base_uri' => $baseUrl,
            'timeout' => 10,
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);
    }

    public function get(string $endpoint, array $params = []): ?array
    {
        $params['api_key'] = $this->apiKey;
        
        // Hapus leading slash jika ada
        $endpoint = ltrim($endpoint, '/');
        
        return $this->requestWithRetry('GET', $endpoint, [
            'query' => $params,
        ]);
    }

    protected function requestWithRetry(string $method, string $endpoint, array $options = [], int $attempt = 1): ?array
    {
        try {
            $response = $this->client->request($method, $endpoint, $options);
            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            $statusCode = $e->getResponse()?->getStatusCode();

            // Rate limit
            if ($statusCode === 429 && $attempt < $this->maxRetries) {
                $retryAfter = (int) ($e->getResponse()->getHeader('Retry-After')[0] ?? 2);
                sleep($retryAfter);
                return $this->requestWithRetry($method, $endpoint, $options, $attempt + 1);
            }

            // Temporary errors
            if (in_array($statusCode, [500, 502, 503, 504]) && $attempt < $this->maxRetries) {
                sleep(pow(2, $attempt));
                return $this->requestWithRetry($method, $endpoint, $options, $attempt + 1);
            }

            Log::error('TMDB API Error', [
                'endpoint' => $endpoint,
                'status' => $statusCode,
                'message' => $e->getMessage(),
                'url' => $e->getRequest()->getUri()->__toString(), // Log full URL untuk debug
            ]);

            throw $e;
        }
    }
}