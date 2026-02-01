<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::select('id', 'user_id', 'title', 'published_at')
            ->with(['user' => fn($query) => $query->select('id', 'name')])
            ->where('is_draft', false)
            ->where(function ($q) {
                $q->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->orderBy('published_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('posts/index', ['posts' => $posts]);
    }

    public function myPosts()
    {
        $posts = Post::select('id', 'user_id', 'is_draft', 'title', 'published_at')
            ->with(['user' => fn($query) => $query->select('id', 'name')])
            ->where('user_id', auth()->id())
            ->orderBy('published_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('posts/user/index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_draft' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['user_id'] = auth()->id();

        if ($validated['is_draft']) {
            $validated['published_at'] = null;
        }

        Post::create($validated);

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if ($post->is_draft && $post->published_at > now()) {
            abort(404);
        }

        return Inertia::render('posts/show', ['post' => $post->load('user:id,name')]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        Gate::authorize('update', $post);

        return Inertia::render('posts/user/edit', ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_draft' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['is_draft']) {
            $validated['published_at'] = null;
        }

        $post->update($validated);

        return redirect()->route('my-posts')
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('update', $post);
        $post->delete();
        return redirect()->route('my-posts')->with('success', 'Post deleted successfully');
    }
}
