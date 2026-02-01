<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\WelcomeController;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('/welcome/{post}', [WelcomeController::class, 'show'])->name('home.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_posts' => Post::count(),
                'total_users' => User::count(),
                'published_posts' => Post::where('is_draft', false)
                    ->where('published_at', '<=', now())
                    ->count(),
            ]
        ]);
    })->name('dashboard');

    Route::resource('/posts', PostController::class)->except('show', 'index');
    Route::get('/my-posts', [PostController::class, 'myPosts'])->name('my-posts');
});

Route::resource('/posts', PostController::class)->only('show', 'index');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
