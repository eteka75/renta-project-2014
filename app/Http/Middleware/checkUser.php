<?php

namespace App\Http\Middleware;

use App\Models\Contact;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class checkUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $nb=Contact::where('read',0)->count();
        Inertia::share([
            '_sms' => ['key'=>'contact','nb'=>$nb]
        ]);
       
        // Vérifier si l'utilisateur est authentifié et a le rôle "ADMIN"
        if (auth()->check() && auth()->user()->role === 'ADMIN') {
            return $next($request);
        }
        Session::flash('danger', [
            'title' => "Accès non autorisé",
            "message" => "Vous ne disposez pas des accès requis pour accéder à cette page"
        ]);
        // Rediriger ou renvoyer une réponse d'erreur, selon vos besoins
        return redirect()->route('home')->with('error', 'Accès non autorisé.'); 
    }   
}
