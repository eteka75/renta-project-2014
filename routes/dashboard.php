<?php

use App\Http\Controllers\Dashboard\AvisClientController;
use App\Http\Controllers\Dashboard\CategorieController;
use App\Http\Controllers\Dashboard\ContactController;
use App\Http\Controllers\Dashboard\ControlVoitureController;
use App\Http\Controllers\Dashboard\EnLocationController;
use App\Http\Controllers\Dashboard\EnVenteController;
use App\Http\Controllers\Dashboard\FaqController;
use App\Http\Controllers\Dashboard\LocalisationController;
use App\Http\Controllers\Dashboard\LocationOptionController;
use App\Http\Controllers\Dashboard\LocationReductionController;
use App\Http\Controllers\Dashboard\MarqueController;
use App\Http\Controllers\Dashboard\OperationVoitureController;
use App\Http\Controllers\Dashboard\OptionVenteController;
use App\Http\Controllers\Dashboard\PointRetraitController;
use App\Http\Controllers\Dashboard\SystemeSecuriteController;
use App\Http\Controllers\Dashboard\TypeCarburantController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\VoitureController;
use App\Http\Controllers\Dashboard\WebInfoController;
use App\Http\Controllers\Dashboard\WebPageController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->middleware(['auth', 'verified','admin'])->group(function () {

    /*Dashboard*/
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/', 'index')->name('dashboard');
    });
    
    /*Voitures*/
    Route::controller(VoitureController::class)->prefix('voitures')->group(function () {
        Route::get('/', 'index')->name('dashboard.voitures');
        Route::get('/search', 'index')->name('dashboard.voitures.search');
        Route::get('/new', 'create')->name('dashboard.voitures.create');
        Route::post('/new', 'store')->name('dashboard.voitures.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.voitures.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.voitures.update');
        Route::get('/export', 'export')->name('dashboard.voitures.export');
        Route::get('/{id}', 'show')->name('dashboard.voitures.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.voitures.delete');
        Route::delete('/media-{img}/{id}', 'destroyImage')->where('img', '-?\d+')->where('id', '-?\d+')->name('dashboard.voitures.image.delete');
        Route::delete('/location_media-{img}/{id}', 'destroyLocationImage')->where('id', '-?\d+')->where('img', '-?\d+')->name('dashboard.voitures.image_location.delete');
    });
    
    /*Marques*/
    Route::controller(MarqueController::class)->prefix('marques')->group(function () {
        Route::get('/', 'index')->name('dashboard.marques');
        Route::get('/search', 'index')->name('dashboard.marques.search');
        Route::get('/new', 'create')->name('dashboard.marques.create');
        Route::post('/new', 'store')->name('dashboard.marques.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.marques.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.marques.update');
        Route::get('/export', 'export')->name('dashboard.marques.export');
        Route::get('/{id}', 'show')->name('dashboard.marques.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.marques.delete');
    });

    /*Marques*/
    Route::controller(CategorieController::class)->prefix('categories')->group(function () {
        Route::get('/', 'index')->name('dashboard.categories');
        Route::get('/search', 'index')->name('dashboard.categories.search');
        Route::get('/new', 'create')->name('dashboard.categories.create');
        Route::post('/new', 'store')->name('dashboard.categories.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.categories.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.categories.update');
        Route::get('/export', 'export')->name('dashboard.categories.export');
        Route::get('/{id}', 'show')->name('dashboard.categories.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.categories.delete');
    });

    /*Type de carburant*/
    Route::controller(TypeCarburantController::class)->prefix('carburants')->group(function () {
        Route::get('/', 'index')->name('dashboard.carburants');
        Route::get('/search', 'index')->name('dashboard.carburants.search');
        Route::get('/new', 'create')->name('dashboard.carburants.create');
        Route::post('/new', 'store')->name('dashboard.carburants.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.carburants.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.carburants.update');
        Route::get('/export', 'export')->name('dashboard.carburants.export');
        Route::get('/{id}', 'show')->name('dashboard.carburants.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.carburants.delete');
    });

    /*Système de sécurités*/
    Route::controller(SystemeSecuriteController::class)->prefix('sys_securites')->group(function () {
        Route::get('/', 'index')->name('dashboard.sys_securites');
        Route::get('/search', 'index')->name('dashboard.sys_securites.search');
        Route::get('/new', 'create')->name('dashboard.sys_securites.create');
        Route::post('/new', 'store')->name('dashboard.sys_securites.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.sys_securites.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.sys_securites.update');
        Route::get('/export', 'export')->name('dashboard.sys_securites.export');
        Route::get('/{id}', 'show')->name('dashboard.sys_securites.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.sys_securites.delete');
    });

    /*Controles Techniques*/
    Route::controller(ControlVoitureController::class)->prefix('controle_techniques')->group(function () {
        Route::get('/', 'index')->name('dashboard.controle_techniques');
        Route::get('/search', 'index')->name('dashboard.controle_techniques.search');
        Route::get('/new', 'create')->name('dashboard.controle_techniques.create');
        Route::post('/new', 'store')->name('dashboard.controle_techniques.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.controle_techniques.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.controle_techniques.update');
        Route::get('/export', 'export')->name('dashboard.controle_techniques.export');
        Route::get('/{id}', 'show')->name('dashboard.controle_techniques.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.controle_techniques.delete');
    })->middleware('web');

    /*Opérations sur voitures */
    Route::controller(OperationVoitureController::class)->prefix('operations')->group(function () {
        Route::get('/', 'index')->name('dashboard.operations');
        Route::get('/search', 'index')->name('dashboard.operations.search');
        Route::get('/new', 'create')->name('dashboard.operations.create');
        Route::post('/new', 'store')->name('dashboard.operations.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.operations.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.operations.update');
        Route::get('/export', 'export')->name('dashboard.operations.export');
        Route::get('/{id}', 'show')->name('dashboard.operations.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.operations.delete');
    });

    /*!!! Voitures en location */
    Route::controller(EnLocationController::class)->prefix('locations')->group(function () {
        Route::get('/', 'index')->name('dashboard.locations');
        Route::get('/search', 'index')->name('dashboard.locations.search');
        Route::get('/new', 'create')->name('dashboard.locations.create');
        Route::post('/new', 'store')->name('dashboard.locations.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.locations.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.locations.update');
        Route::get('/export', 'export')->name('dashboard.locations.export');
        Route::get('/{id}', 'show')->name('dashboard.locations.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.locations.delete');
    });

    /* Points de retraits */
    Route::controller(PointRetraitController::class)
        ->prefix('point_retraits')->group(function () {
        Route::get('/', 'index')->name('dashboard.point_retraits');
        Route::get('/search', 'index')->name('dashboard.point_retraits.search');
        Route::get('/new', 'create')->name('dashboard.point_retraits.create');
        Route::post('/new', 'store')->name('dashboard.point_retraits.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.point_retraits.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.point_retraits.update');
        Route::get('/export', 'export')->name('dashboard.point_retraits.export');
        Route::get('/{id}', 'show')->name('dashboard.point_retraits.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.point_retraits.delete');
    });
    /* Options de locations */
    Route::controller(LocationOptionController::class)
        ->prefix('location_options')->group(function () {
        Route::get('/', 'index')->name('dashboard.location_options');
        Route::get('/search', 'index')->name('dashboard.location_options.search');
        Route::get('/new', 'create')->name('dashboard.location_options.create');
        Route::post('/new', 'store')->name('dashboard.location_options.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.location_options.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.location_options.update');
        Route::get('/export', 'export')->name('dashboard.location_options.export');
        Route::get('/{id}', 'show')->name('dashboard.location_options.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.location_options.delete');
    });
    /* Réduction */
    Route::controller(LocationReductionController::class)
        ->prefix('reductions')->group(function () {
        Route::get('/', 'index')->name('dashboard.location_reductions');
        Route::get('/search', 'index')->name('dashboard.location_reductions.search');
        Route::get('/new', 'create')->name('dashboard.location_reductions.create');
        Route::post('/new', 'store')->name('dashboard.location_reductions.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.location_reductions.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.location_reductions.update');
        Route::get('/export', 'export')->name('dashboard.location_reductions.export');
        Route::get('/{id}', 'show')->name('dashboard.location_reductions.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.location_reductions.delete');
    });
    /* En ventes */
    Route::controller(EnVenteController::class)
        ->prefix('ventes')->group(function () {
        Route::get('/', 'index')->name('dashboard.ventes');
        Route::get('/search', 'index')->name('dashboard.ventes.search');
        Route::get('/new', 'create')->name('dashboard.ventes.create');
        Route::post('/new', 'store')->name('dashboard.ventes.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.ventes.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.ventes.update');
        Route::get('/export', 'export')->name('dashboard.ventes.export');
        Route::get('/{id}', 'show')->name('dashboard.ventes.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.ventes.delete');
    });
    /*Options vente*/
    Route::controller(OptionVenteController::class)
        ->prefix('options_ventes')->group(function () {
        Route::get('/', 'index')->name('dashboard.option_ventes');
        Route::get('/search', 'index')->name('dashboard.option_ventes.search');
        Route::get('/new', 'create')->name('dashboard.option_ventes.create');
        Route::post('/new', 'store')->name('dashboard.option_ventes.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.option_ventes.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.option_ventes.update');
        Route::get('/export', 'export')->name('dashboard.option_ventes.export');
        Route::get('/{id}', 'show')->name('dashboard.option_ventes.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.option_ventes.delete');
    });
    /*Page*/
    Route::controller(WebPageController::class)->prefix('pages')->group(function () {
        Route::get('/', 'index')->name('dashboard.webpages');
        Route::get('/search', 'index')->name('dashboard.webpages.search');
        Route::get('/new', 'create')->name('dashboard.webpages.create');
        Route::post('/new', 'store')->name('dashboard.webpages.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.webpages.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.webpages.update');
        Route::get('/export', 'export')->name('dashboard.webpages.export');
        Route::get('/{id}', 'show')->name('dashboard.webpages.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.webpages.delete');
    });
    /*FAQ*/
    Route::controller(FaqController::class)->prefix('faq')->group(function () {
        Route::get('/', 'index')->name('dashboard.faqs');
        Route::get('/search', 'index')->name('dashboard.faqs.search');
        Route::get('/new', 'create')->name('dashboard.faqs.create');
        Route::post('/new', 'store')->name('dashboard.faqs.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.faqs.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.faqs.update');
        Route::get('/export', 'export')->name('dashboard.faqs.export');
        Route::get('/{id}', 'show')->name('dashboard.faqs.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.faqs.delete');
    });
    /*Avis*/
    Route::controller(AvisClientController::class)->prefix('avis')->group(function () {
        Route::get('/', 'index')->name('dashboard.avis_clients');
        Route::get('/search', 'index')->name('dashboard.avis_clients.search');
        Route::get('/new', 'create')->name('dashboard.avis_clients.create');
        Route::post('/new', 'store')->name('dashboard.avis_clients.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.avis_clients.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.avis_clients.update');
        Route::get('/export', 'export')->name('dashboard.avis_clients.export');
        Route::get('/{id}', 'show')->name('dashboard.avis_clients.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.avis_clients.delete');
    });
    /*Infos*/
    Route::controller(WebInfoController::class)->prefix('infos')->group(function () {
        Route::get('/', 'index')->name('dashboard.infos');
        Route::get('/search', 'index')->name('dashboard.infos.search');
        Route::get('/new', 'create')->name('dashboard.infos.create');
        Route::post('/new', 'store')->name('dashboard.infos.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.infos.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.infos.update');
        Route::get('/export', 'export')->name('dashboard.infos.export');
        Route::get('/{id}', 'show')->name('dashboard.infos.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.infos.delete');
    });
     /*Infos*/
     Route::controller(ContactController::class)->prefix('contacts')->group(function () {
        Route::get('/', 'index')->name('dashboard.contacts');
        Route::get('/search', 'index')->name('dashboard.contacts.search');
        Route::get('/new', 'create')->name('dashboard.contacts.create');
        Route::post('/new', 'store')->name('dashboard.contacts.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.contacts.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.contacts.update');
        Route::get('/export', 'export')->name('dashboard.contacts.export');
        Route::get('/{id}', 'show')->name('dashboard.contacts.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.contacts.delete');
    });
     /*Localisations*/
     Route::controller(LocalisationController::class)->prefix('localisations')->group(function () {
        Route::get('/', 'index')->name('dashboard.localisations');
        Route::get('/search', 'index')->name('dashboard.localisations.search');
        Route::get('/new', 'create')->name('dashboard.localisations.create');
        Route::post('/new', 'store')->name('dashboard.localisations.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.localisations.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.localisations.update');
        Route::get('/export', 'export')->name('dashboard.localisations.export');
        Route::get('/{id}', 'show')->name('dashboard.localisations.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.localisations.delete');
    });

     /*Clients*/
     Route::controller(UserController::class)->prefix('clients')->group(function () {
        Route::get('/', 'index')->name('dashboard.clients');
        Route::get('/search', 'index')->name('dashboard.clients.search');
        Route::get('/new', 'create')->name('dashboard.clients.create');
        Route::post('/new', 'store')->name('dashboard.clients.store');
        Route::get('/edit/{id}', 'edit')->name('dashboard.clients.edit');
        Route::post('/edit/{id}', 'update')->name('dashboard.clients.update');
        Route::get('/export', 'export')->name('dashboard.clients.export');
        Route::get('/{id}', 'show')->name('dashboard.clients.show');
        Route::delete('/{id}', 'destroy')->name('dashboard.clients.delete');
    });

});

/*
Route::controller(FrontController::class)
->prefix('dashboards')->group(function () {
    Route::get('/', 'index')->name('dash.home');
    Route::post('voitures', 'getVoi');
})->middleware('jwt.verify'); 
*/