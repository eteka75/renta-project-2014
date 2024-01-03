<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        // Vérifier si l'utilisateur est authentifié et a le rôle "ADMIN"
        if (auth()->check() && auth()->user()->roles === 'ADMIN') {
            return $next($request);
        }
        // Rediriger ou renvoyer une réponse d'erreur, selon vos besoins
        return redirect()->route('home')->with('error', 'Accès non autorisé.'); 
    }   
}
