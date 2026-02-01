<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Menampilkan daftar postingan yang sudah dipublikasikan ke publik.
     */
    public function index(): Response
    {
        $posts = Post::query()
            ->select(['id', 'user_id', 'title', 'content', 'published_at'])
            ->with('user:id,name')
            ->published()
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('welcome', [
            'posts' => $posts,
        ]);
    }

    /**
     * Menampilkan detail postingan publik.
     */
    public function show(Post $post): Response
    {
        // Pastikan post tidak dalam status draft dan sudah melewati waktu publish
        if ($post->is_draft || ($post->published_at && $post->published_at->isFuture())) {
            abort(404);
        }

        return Inertia::render('welcome-show', [
            'post' => $post->load('user:id,name'),
        ]);
    }
}
