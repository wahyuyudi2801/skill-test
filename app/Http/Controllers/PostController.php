<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Tampilan untuk publik (Hanya yang sudah publish).
     */
    public function index(): Response
    {
        $posts = Post::query()
            ->select('id', 'user_id', 'title', 'published_at')
            ->with('user:id,name')
            ->where('is_draft', false)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('posts/index', ['posts' => $posts]);
    }

    /**
     * Postingan milik saya sendiri (Termasuk draft/scheduled).
     */
    public function myPosts(): Response
    {
        $posts = Post::query()
            ->select('id', 'user_id', 'is_draft', 'title', 'published_at')
            ->with('user:id,name')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('posts/user/index', ['posts' => $posts]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatePost($request);

        // Menggunakan relationship create untuk otomatis mengisi user_id
        $request->user()->posts()->create($validated);

        return redirect()->route('my-posts')
            ->with('success', 'Post created successfully.');
    }

    public function show(Post $post): Response
    {
        // Kebijakan: Jika draft ATAU belum waktunya publish,
        // hanya pemilik yang bisa melihat.
        $isNotPublished = $post->is_draft || ($post->published_at && $post->published_at->isFuture());

        if ($isNotPublished && auth()->id() !== $post->user_id) {
            abort(404);
        }

        return Inertia::render('posts/show', [
            'post' => $post->load('user:id,name'),
        ]);
    }

    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render('posts/user/edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $this->validatePost($request);
        $post->update($validated);

        return redirect()->route('my-posts')
            ->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post); // Gunakan 'delete' bukan 'update'

        $post->delete();

        return redirect()->route('my-posts')
            ->with('success', 'Post deleted successfully');
    }

    /**
     * Helper untuk validasi dan logika bisnis field.
     */
    protected function validatePost(Request $request): array
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_draft' => 'required|boolean',
            'published_at' => 'nullable|date|required_if:is_draft,false',
        ]);

        // Jika draft, pastikan published_at null.
        // Jika publish tapi tanggal kosong, isi dengan now().
        if ($validated['is_draft']) {
            $validated['published_at'] = null;
        } elseif (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        return $validated;
    }
}
