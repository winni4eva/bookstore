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

	Route::group(array('prefix' => 'v1', 'only' => ['index'] ), function(){

		Route::resource('books', 'BooksController');
		Route::resource('categories', 'CategoryController');

	});

});

//Admin only books api
Route::group(array('prefix' => 'api'), function(){

	Route::group(array('prefix' => 'v1'), function(){

		Route::group(array('prefix' => 'admin'), function(){

			Route::resource('books', 'BooksController');
			Route::resource('categories', 'CategoryController');
			Route::resource('sales', 'SalesController');

		});

	});

});

//Authentication routes
Route::post('auth/login', function(Illuminate\Http\Request $request){
	
            $auth = false;
            $credentials = $request->only('email', 'password');

            if (\Auth::attempt($credentials, $request->has('remember'))) return response()->json(['success' => 'User logged in successfully...', 'user' => \Auth::user()], 200);

        	return response()->json(['error' => 'Wrong username/password combination.'], 403);
});

Route::get('auth/logout', function(){
	if(\Auth::check()){
		\Auth::logout();
		return response()->json(['success' => 'User logged out successfully'], 200);
	}

	return response()->json(['error' => 'Error logging user out...'], 403);
});

Route::get('auth/check', function(){
	if (\Auth::check()) return response()->json(['success' => 'User is logged in', 'user' => \Auth::user()], 200);
	
	return response()->json(['error' => 'User is not logged in...'], 403);
});