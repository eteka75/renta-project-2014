<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class CheckValidateAccount
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        // Vérifier si l'utilisateur est authentifié etat "1"
       //dd(auth()->user()->etat);
        if (auth()->check() && auth()->user()->etat ===true) {
            return $next($request);
        }
        Session::flash('danger', [
            'title' => "Faites valider votre compte pour continuer",
            "message" => "Pour bénéficier des avantages de cette plateforme, veuillez vous connecter ou créer un compte, si vous êtes nouveau. Ensuite remplissez le formulaire d'identification et effectuez vos opérations en tout tranquilité."
        ]);
        // Rediriger ou renvoyer une réponse d'erreur, selon vos besoins
        return back();//redirect()->route('login');//->with('error', 'Accès non autorisé.'); 
    }
}
