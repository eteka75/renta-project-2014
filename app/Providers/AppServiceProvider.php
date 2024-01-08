<?php

namespace App\Providers;

use App\Models\Marque;
use App\Models\WebInfo;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot() :void
    {
        $info_bas_page=WebInfo::where('code','infos_bas_bage')->first();
        $tmarques=Marque::orderBy('nom')
        ->whereHas('voitures.medias')->take(12)->get(['nom','id']);

        Inertia::share([
            'info_bas_page'=>$info_bas_page,
            "tmarques"=>$tmarques,
        ]);
        Artisan::call('update:etat-location');
    }
}
