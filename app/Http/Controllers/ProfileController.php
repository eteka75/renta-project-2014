<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller\Dashboard;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    private static $viewFolder = "Dashboard/Profile";
    private static $imageFolder = "storage/datas/users/";
    /**
     * Display the user's profile form.
     */
    public function getProfile(Request $request): Response
    {
        Inertia::share(['active_menu'=>'home_compte']);
        return Inertia::render('Profile/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'page_title'=>'Gérer mon profil',
            'page_subtitle'=>"Consultez et modifiez votre compte",
        ]);
    }
    public function edit(Request $request): Response
    {
        Inertia::share(['active_menu'=>'edit_compte']);
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function editPassword (Request $request): Response
    {
        Inertia::share(['active_menu'=>'edit_pwd']);
        return Inertia::render('Profile/EditPassword', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function accountDelete  (Request $request): Response
    {
        Inertia::share(['active_menu'=>'delete']);
        return Inertia::render('Profile/Delete', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    
    public function editSettings   (Request $request): Response
    {
        Inertia::share(['active_menu'=>'params']);
        return Inertia::render('Profile/Parametres', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function getActivity (): Response
    {
        Inertia::share(['active_menu'=>'actitity']);
        return Inertia::render('Profile/Activity', [
            'page_id'=>'',
            'page_title'=>'Mes activités',
            'page_subtitle'=>"Consultez mes activités sur Rental Car Services",
        ]);
    }
    public function getNotifications (): Response
    {
        Inertia::share(['active_menu'=>'actitity']);
        return Inertia::render('Profile/Notifications', [
            'page_id'=>''
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data=$request->validated();
        unset($data['photo']);
       
        if($request->hasFile('photo')){
            $getSave = $this->savePhoto($request);
            if ($getSave !== '') {
                $this->deleteImage($request->user()->photo);
                $data['photo'] = $getSave;
                
            }
        }

        $request->user()->fill($data);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        
        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    public function deleteImage($filePath)
    {
        if (file_exists($filePath)) {
           if(unlink($filePath)){return true;}
        } 
        return false;
    }
     public function savePhoto(Request $request)
    {
        $nomLogo = '';
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $destinationPath = (self::$imageFolder);
            if (!Storage::exists($destinationPath)) {
                Storage::makeDirectory($destinationPath);
            }
            $file->move($destinationPath, $fileName);
            $nomLogo = self::$imageFolder . $fileName;
        }
        return $nomLogo;
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
