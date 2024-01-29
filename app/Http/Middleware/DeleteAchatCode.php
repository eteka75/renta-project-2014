<?php

namespace App\Http\Middleware;

use App\Models\Achat;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class DeleteAchatCode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id=$request->get('id');
        $reservationCode = $request->input('a_code', $request->cookie('a_code'));
        $response = $next($request);
        $transaction = Achat::where('id', $id)->where('client_id',$this->getUserId())->first();
        if ($reservationCode!=null) {
            $this->deleteReservationCodeCookie($response);
            $reservationCode2 = $request->input('a_code', $request->cookie('a_code'));
        }
       //dd($reservationCode,$reservationCode2,$response);
        return $response;
    }
    public function getUserId()
    {
        return  Auth::user() ? Auth::user()->id : 0;
    }
    public function deleteReservationCodeCookie()
    {
        return Cookie::queue(Cookie::forget('a_code'));;
    }
}
