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

Route::get('/', function () {
    return redirect('/chat');
});

Route::get('/old', 'ChatController@old');

Route::post('/save', 'ChatController@save');

Route::get('/chat', 'ChatController@chat');

Route::post('/send', 'ChatController@send');

Auth::routes();