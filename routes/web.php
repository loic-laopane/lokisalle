<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/* Administration */
Route::group(['prefix'=>'admin', 'middleware'=> ['auth', 'admin']], function() {
    Route::get('salles', function() {
        return view('admin.gestion.salle');
    });
});


Route::get('/', function () {
    return view('index');
});
Route::get('/avis', function () {
    return view('avis');
});
Route::get('/produit', function () {
    return view('produit');
});
Route::get('/detail', function () {
    return view('detail');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/profil', function () {
    return view('profil');
});

Auth::routes();

//Pour se déconnecter en get
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/home', 'HomeController@index');
