<?php
declare(strict_types=1);
/** AZUMAMARU public read-only catch feed. No LINE account or club data. */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405);
    echo json_encode(['error'=>'Method Not Allowed']);
    exit;
}
$path = __DIR__ . '/data/catches.json';
if (!is_file($path)) {
    echo '{"posts":[]}';
    exit;
}
$raw = @file_get_contents($path);
$entries = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($entries)) {
    http_response_code(503);
    echo '{"error":"Feed temporarily unavailable"}';
    exit;
}
$max = min(50, max(1, (int)($_GET['limit'] ?? 24)));
$posts = [];
foreach (array_slice($entries, 0, $max) as $entry) {
    if (!is_array($entry)) continue;
    $photos = [];
    foreach (($entry['photos'] ?? []) as $photo) {
        $url = is_array($photo) ? (string)($photo['url'] ?? '') : '';
        if (preg_match('~^media/catches/[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|webp)$~', $url)) {
            $photos[] = ['url'=>$url];
        }
        if (count($photos) === 5) break;
    }
    if (!$photos) continue; // A real report requires at least one locally hosted photo.
    $tags = [];
    foreach (($entry['tags'] ?? []) as $tag) {
        if (is_string($tag) && mb_strlen($tag) <= 30) $tags[] = $tag;
        if (count($tags) === 8) break;
    }
    $posts[] = [
      'title'=>mb_substr((string)($entry['title'] ?? ''),0,100),
      'body'=>mb_substr((string)($entry['body'] ?? ''),0,500),
      'published_at'=>(string)($entry['published_at'] ?? ''),
      'tags'=>$tags,
      'photos'=>$photos
    ];
}
echo json_encode(['posts'=>$posts],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
