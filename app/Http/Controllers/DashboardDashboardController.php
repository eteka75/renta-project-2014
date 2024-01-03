<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardDashboardController extends Controller
{
    private static $viewFolder = "Dashboard";
    
    public function index()
    {
        return Inertia::render(self::$viewFolder . '/Index', [
            'page_name' => "dashboard"
        ]);
    }
}
