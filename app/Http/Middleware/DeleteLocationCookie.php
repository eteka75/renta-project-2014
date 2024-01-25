<?php

namespace App\Http\Middleware;

use App\Models\Transaction;
use Closure;
use Illuminate\Support\Facades\Auth;
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
        $id=$request->get('id');
        $reservationCode = $request->input('r_code', $request->cookie('r_code'));
        $response = $next($request);
        $transaction = Transaction::where('id', $id)->where('client_id',$this->getUserId())->first();

        //dd($id);
       // if ($reservationCode!=null && $transaction && $transaction->etat===1) {
        if ($reservationCode!=null) {
            $this->deleteReservationCodeCookie($response);
            $reservationCode2 = $request->input('r_code', $request->cookie('r_code'));
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
        return Cookie::queue(Cookie::forget('r_code'));;
    }
}
