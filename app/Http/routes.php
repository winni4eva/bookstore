<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

//Publicly accesible books api
Route::group(array('prefix' => 'api'), function(){

	Route::group(array('prefix' => 'v1', 'only' => ['index', 'show'] ), function(){

		Route::resource('books', 'BooksController');

	});

});

//Admin only books api
Route::group(array('prefix' => 'api'), function(){

	Route::group(array('prefix' => 'v1'), function(){

		Route::group(array('prefix' => 'admin'), function(){

			Route::resource('books', 'BooksController');
			Route::resource('categories', 'CategoryController');
			//Route::resource('banners', 'BannerImagesController');

		});

	});

});