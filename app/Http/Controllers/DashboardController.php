<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_posts' => Post::count(),
                'total_users' => User::count(),
                'published_posts' => Post::where('is_draft', false)
                    ->where('published_at', '<=', now())
                    ->count(),
            ],
        ]);
    }
}
