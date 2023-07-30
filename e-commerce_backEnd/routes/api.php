<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavouriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::post('/add_update_product/{id?}', [AdminController::class, "addOrUpdateProduct"]);
Route::get('/get_products/{id?}', [AdminController::class, "getProducts"]);
Route::get('/delete_product/{id}', [AdminController::class, "deleteProduct"]);

Route::post('/add_to_cart', [CartController::class, "addToCart"]);
Route::get('/get_user/{id}', [UserController::class, "showUserInfo"]);
Route::post('/update_user/{id}', [UserController::class, "updateUserInfo"]);

Route::post('/addToFav', [FavouriteController::class, "addToFavorites"]);


