<?php

namespace App\Http\Middleware;

use App\Models\Favori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        //dd($request->session()->get('message') ??'');
        $favoris=[];
        if(Auth::user()){
            $favoris=Favori::where('user_id',Auth::user()->id)->select('type','location_id','achat_id')->get()->toArray();
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'favoris' => $favoris,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ], 
            'flash' => [
                'info' => fn () => $request->session()->get('info'),
                'danger' => fn () => $request->session()->get('danger'),
                'success' => fn () => $request->session()->get('success'),
                'warning' => fn () => $request->session()->get('warning')
            ],
        ];
    }
}
