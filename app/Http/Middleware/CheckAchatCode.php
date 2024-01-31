<?php

namespace App\Http\Middleware;

use App\Models\Achat;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class CheckAchatCode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
            
            $items=$request->all();
            $achatCode = $request->input('a_code', $request->cookie('a_code'));
            $adata = $request->input('a_data', $request->cookie('a_data'));
            
           /*if(empty($items)){
            return back();
           }*/
            if (!$achatCode) {
                // If no reservation code is provided, generate a new one
                $achatCode = $this->generateUniqueachatCode();
                $response->cookie('a_code', $achatCode, 60*24);
            }
            if (empty($adata)) {
                $response->cookie('a_data', json_encode($items));
            }
           
            return $response;
    }
    public function deleteachatCodeCookie(Response $response)
        {
            $response->cookie(Cookie::forget('a_code'));
            return $response->cookie(Cookie::forget('a_data'));
        }
    
        private function generateUniqueachatCode()
        {
            do {
                // Generate a random reservation code
                $achatCode = $this->generateRandomCode();    
                // Check if the generated code already exists in the reservations table
                $exists = Achat::where('code_achat', $achatCode)->exists();
                
            } while ($exists);
    
            return $achatCode;
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
