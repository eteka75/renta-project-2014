<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontController;


Route::controller(FrontController::class)->group(function () {
    Route::get('/', 'index')->name('home');
   
    Route::get('/reservation/@{code}', 'getRervationLocation')->name('front.getRLocation');
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
    Route::get('/achat/voiture/{id}', 'showAchat')->name('front.achat');
    Route::get('/locations', 'getLocations')->name('front.locations');
    Route::get('/locations/categories', 'getCatLocations')->name('front.cat_locations');
    Route::get('/locations/search', 'getSearchLocation')->name('front.location.search');
    Route::get('/location/{id}', 'showLocation')->where('id', '\d+')->name('front.location');
    Route::any('/favoris/add', 'addFavoris')->name('front.favoris.add');
    Route::any('/favoris/remove', 'removeFavoris')->name('front.favoris.remove');
    /* catgories voitures */
    Route::get('/categories', 'getCategories')->name('front.cat_voitures');
    //Route::get('/voiture/marques', 'getMarques')->name('front.marq_voiture');
    Route::get('/voiture/marque/{id}', 'getMarque')->where('id', '\d+')->name('front.marq_voiture');
    Route::get('/voiture/marque-{id}/locations', 'getMarqueLocations')->where('id', '\d+')->name('front.marques.locations');
    Route::get('/voiture/marque-{id}/achats', 'getMarqueAchats')->where('id', '\d+')->name('front.marques.achats');
    Route::get('/voiture/categorie/{id}-{slug?}', 'getVCategorie')->name('front.cat_voiture');

    Route::get('/voiture/marquess', 'getMarques')->name('front.marques');
    //Route::get('/voiture/marques', 'getMarques')->name('front.lesmarques');
    /*Marques*/

    Route::get('/voiture/categorie/{slug}', 'getCategorie')->name('front.catvoiture');
    Route::get('/faq-info/{id}-{slug}', 'getFaqInfo')->name('front.faqinfo')->where('id', '\d+');


    /*Send Message*/
}); //->middleware('web'); 


/* User profil */
Route::middleware(['auth'])->prefix('commande/location/')->group(function () {
    Route::controller(FrontController::class)->group(function () {
        Route::get('/{id}', 'checkCommandeLocation1')->name('front.lcommande1')->where('id', '\d+')->middleware("transactionHasId");
        Route::get('/voiture/{code}', 'getCommandeLocation1')->name('front.ccommande1');//->middleware("transactionHasId");
        Route::post('/{code}', 'postCommandeLocation1')->name('front.plcommande1');//->middleware("transactionHasId");
        //Route::post('/payement', 'getCommandeLocation2')->name('front.lcommande2');
        //http://127.0.0.1:8000/commande/location/payement/93
        Route::middleware(['validate.user'])->group(function () {
            Route::get('payement/{id}', 'getCommandeLocation2')->where('id', '\d+')->name('front.lcommande2');
            Route::post('payement/{id}', 'postCommandeLocation2')->where('id', '\d+')->name('front.pcommande2');
            Route::get('validation/{id}', 'getCommandeLocation3')->where('id', '\d+')->name('front.lcommande3')->middleware("transactionDeleteId");;
            Route::post('validation/{id}', 'postCommandeLocation3')->where('id', '\d+')->name('front.pcommande3');
            Route::get('facture/{id}', 'getFactureLocation')->where('id', '\d+')->name('front.lfacture');
        });
    });
});

Route::middleware(['auth'])->prefix('/commande/voiture/')->group(function () {
    Route::controller(FrontController::class)->group(function () {
        Route::get('/{vid}', 'checkAchat1')->name('front.lachat1')->middleware("achatHasId");
        Route::get('/achat/{code}/{vid}', 'getCommandeAchat1')->name('front.cachat1');
        Route::post('achat/{code}', 'postCommandeAchat1')->name('front.pachat1');
        //Route::get('/{id}', 'checkCommandeAchat1')->name('front.lcommande1')->where('id', '\d+');
       // Route::get('/{code}', 'getCommandeAchat1')->name('front.ccommande1');//->middleware("transactionHasId");
      //  Route::post('/{code}', 'postCommandeAchat1')->name('front.plcommande1');//->middleware("transactionHasId");

        Route::middleware(['validate.user'])->group(function () {
            Route::get('/payement/', 'getAchat2')->where('id', '\d+')->name('front.lachat2');
            Route::post('/payement/', 'postAchat2')->where('id', '\d+')->name('front.pachat2');
            Route::get('/validation/{id}', 'getAchat3')->where('id', '\d+')->name('front.lachat3')->middleware("achatDeleteId");;
            Route::post('/validation/{id}', 'postAchat3')->where('id', '\d+')->name('front.pachat3');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfile'])->name('profile.home');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/password', [ProfileController::class, 'editPassword'])->name('profile.edit_password');
    Route::get('/profile/settings', [ProfileController::class, 'editSettings'])->name('profile.edit_settings');
    Route::get('/profile/account-delete', [ProfileController::class, 'accountDelete'])->name('profile.account_delete');

    /*Activity*/
    Route::get('/activity', [ProfileController::class, 'getActivity'])->name('profile.activity');
    Route::get('/activity/notifications', [ProfileController::class, 'getNotifications'])->name('profile.notifications');
    Route::get('/activity/favoris', [ProfileController::class, 'getFavoris'])->name('profile.favoris');
    Route::get('/activity/locations', [ProfileController::class, 'getLocations'])->name('profile.locations');
    Route::get('/activity/location/{id}', [ProfileController::class, 'getActivityLocation'])->name('profile.getlocation');
    Route::get('/activity/achats', [ProfileController::class, 'getAchats'])->name('profile.achats');

    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //identifications Client
    Route::get('/identification', [ProfileController::class, 'getIdentification'])->name('profile.identification');
    Route::post('/identification', [ProfileController::class, 'postIdentification'])->name('profile.identification.save');
    Route::get('/identification/edit', [ProfileController::class, 'editIdentification'])->name('profile.identification.edit');
    Route::post('/identification/edit', [ProfileController::class, 'UpdateIdentification'])->name('profile.identification.update');
})->middleware('throttle:6,1');

/*
Route::controller(FrontController::class)
->prefix('home')->group(function () {
    Route::get('/', 'index')->name('home');
    Route::post('voitures', 'voitures');
})->middleware('jwt.verify'); */