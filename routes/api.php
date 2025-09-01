<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// rota simples de teste
Route::get('/ping', fn () => response()->json(['pong' => true]));

// rota pública de login
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

// rota pública de signup
Route::post('/signup', [\App\Http\Controllers\Api\AuthController::class, 'signup']);

// rotas protegidas com Sanctum (Bearer token em Authorization)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // logout invalida o token atual
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
});
