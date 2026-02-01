<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    function index()
    {
        $posts = Post::select('id', 'user_id', 'title', 'content', 'published_at')
            ->with(['user' => fn($query) => $query->select('id', 'name')])
            ->where('is_draft', false)
            ->where(function ($q) {
                $q->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->orderBy('published_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('welcome', ['posts' => $posts]);
    }

    function show(Post $post)
    {
        if ($post->is_draft) {
            abort(404);
        }

        return Inertia::render('welcome-show', [
            'post' => $post->load('user:id,name')
        ]);
    }
}
