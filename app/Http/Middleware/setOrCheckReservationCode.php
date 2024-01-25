<?php

namespace App\Http\Middleware;

use App\Models\Reservation;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class setOrCheckReservationCode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            $reservationCode = $request->input('r_code', $request->cookie('r_code'));
    
            if (!$reservationCode) {
                // If no reservation code is provided, generate a new one
                $reservationCode = $this->generateUniqueReservationCode();
    
                // Set the reservation code in the cookie
                $response = $next($request);
                $response->cookie('r_code', $reservationCode);
    
                return $response;
            }
    
            // If reservation code exists, continue with the request
            return $next($request);
        }
        public function deleteReservationCodeCookie(Response $response)
        {
            return $response->cookie(Cookie::forget('r_code'));
        }
    
        private function generateUniqueReservationCode()
        {
            do {
                // Generate a random reservation code
                $reservationCode = $this->generateRandomCode();
    
                // Check if the generated code already exists in the reservations table
                $exists = Reservation::where('code_reservation', $reservationCode)->exists();
                
            } while ($exists);
    
            return $reservationCode;
        }
    
        private function generateRandomCode($length = 10)
        {
            // Generate a random string of specified length
            $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $randomCode = '';
    
            for ($i = 0; $i < $length; $i++) {
                $randomCode .= $characters[rand(0, strlen($characters) - 1)];
            }
    
            return $randomCode;
        }
}
