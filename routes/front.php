<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontController;


Route::controller(FrontController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/a-propos', 'getApropos')->name('front.apropos');
    Route::get('/services', 'getServices')->name('front.services');
    Route::get('/contact', 'getContact')->name('front.contact');
    Route::post('/contact', 'postContact')->name('front.contact.send');
    Route::get('/messages', 'getMessages')->name('front.messages');
    Route::get('/faq', 'getFaqs')->name('front.faq');
    Route::get('/support', 'getSupports')->name('front.support');
    Route::get('/faqs', 'getFaqs')->name('front.faqs');
    Route::get('/termes-et-conditions', 'getTermes')->name('front.termes');
    Route::get('/panier', 'getPanier')->name('front.panier');
    Route::get('/avis-clients', 'getAvis')->name('front.avis');
    /*Voitures*/
    Route::get('/achats', 'getAchats')->name('front.achats');
    Route::post('/achats', 'getAchats')->name('front.achats');
    Route::get('/achat/voiture/{id}', 'showAchat')->name('front.achat');
    Route::get('/locations', 'getLocations')->name('front.locations');
    Route::get('/locations/categories', 'getCatLocations')->name('front.cat_locations');
    Route::get('/locations/search', 'getSearchLocation')->name('front.location.search');
    Route::get('/location/{id}', 'showLocation')->name('front.location');
    Route::any('/favoris/add', 'addFavoris')->name('front.favoris.add');
    Route::any('/favoris/remove', 'removeFavoris')->name('front.favoris.remove');
    /* catgories voitures */
    Route::get('/categories', 'getCategories')->name('front.cat_voitures');
    Route::get('/voiture/marques', 'getMarques')->name('front.marques');
    Route::get('/voiture/marque/{id}', 'getMarque')->where('id', '\d+')->name('front.marq_voiture');
    Route::get('/voiture/marque/{id}/locations', 'getMarqueLocations')->where('id', '\d+')->name('front.marques.locations');
    Route::get('/voiture/marque/{id}/achats', 'getMarqueAchats')->where('id', '\d+')->name('front.marques.achats');
    Route::get('/voiture/categorie/{id}-{slug?}', 'getVCategorie')->name('front.cat_voiture');
    /*Marques*/
    
    Route::get('/voiture/categorie/{slug}', 'getCategorie')->name('front.catvoiture');
    Route::get('/faq-info/{id}-{slug}', 'getFaqInfo')->name('front.faqinfo')->where('id', '\d+');

    Route::get('/location/commande', 'getPageCommande1')->name('front.commande1');

    /*Send Message*/

})->middleware('web'); 


/* User profil */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfile'])->name('profile.home');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/password', [ProfileController::class, 'editPassword'])->name('profile.edit_password');
    Route::get('/profile/settings', [ProfileController::class, 'editSettings'])->name('profile.edit_settings');
    Route::get('/profile/account-delete', [ProfileController::class, 'accountDelete'])->name('profile.account_delete');
    Route::get('/profile/locations', [ProfileController::class, 'getUserLocations'])->name('profile.locations');
    Route::get('/profile/achats', [ProfileController::class, 'getUserAchats'])->name('profile.achats');
    Route::get('/profile/favoris', [ProfileController::class, 'getUserFavoris'])->name('profile.favoris');
    
    /*Activity*/
    Route::get('/activity', [ProfileController::class, 'getActivity'])->name('profile.activity');
    Route::get('/activity/notifications', [ProfileController::class, 'getNotifications'])->name('profile.notifications');
    Route::get('/activity/favoris', [ProfileController::class, 'getFavoris'])->name('profile.favoris');
    Route::get('/activity/locations', [ProfileController::class, 'getLocations'])->name('profile.locations');
    Route::get('/activity/achats', [ProfileController::class, 'getAchats'])->name('profile.achats');
    
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Location de voitures

})->middleware('throttle:6,1');

/*
Route::controller(FrontController::class)
->prefix('home')->group(function () {
    Route::get('/', 'index')->name('home');
    Route::post('voitures', 'voitures');
})->middleware('jwt.verify'); */