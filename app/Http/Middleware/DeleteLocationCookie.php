<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class DeleteLocationCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $reservationCode = $request->input('r_code', $request->cookie('r_code'));

        if ($reservationCode) {
            $response = new Response();
           $this->deleteReservationCodeCookie($response);
        
            // You can also return a response with the cookie deleted
            //return $response;
        }
        return $next($request);
    }
    public function deleteReservationCodeCookie(Response $response)
    {
        return $response->cookie(Cookie::forget('r_code'));
    }
}
