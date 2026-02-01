<?php

use App\Http\Controllers\DashboardController; // Disarankan pindah ke Controller
use App\Http\Controllers\PostController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

// --- Public Routes ---
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/welcome/{post}', [WelcomeController::class, 'show'])->name('home.show');

// --- Authenticated Routes ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', PostController::class);
    Route::get('my-posts', [PostController::class, 'myPosts'])->name('my-posts');
});

// --- Included Routes ---
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
