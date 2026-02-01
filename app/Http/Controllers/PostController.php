<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function index(): JsonResponse
    {
        $posts = Post::with('user')
            ->active()
            ->latest()
            ->paginate(20);

        return response()->json($posts);
    }

    public function create(): string
    {
        return 'posts.create';
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        $post = $request->user()->posts()->create($validated);

        return response()->json($post, 201);
    }

    public function show(Post $post): JsonResponse
    {
        // Pastikan post sudah publish
        if (! $post->published_at || $post->published_at->isFuture()) {
            abort(404);
        }

        return response()->json($post->load('user'));
    }

    public function edit(Post $post): string
    {
        Gate::authorize('update', $post);

        return 'posts.edit';
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'published_at' => 'nullable|date',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy(Post $post): JsonResponse
    {
        Gate::authorize('delete', $post);

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
