<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController as AuthController;

// rota simples de teste
Route::get('/ping', fn () => response()->json(['pong' => true]));

// rotas protegidas com Sanctum (Bearer token em Authorization)
Route::middleware('auth:sanctum')->group(
    function () {
        
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
});


// rota pública de login
Route::post('/login', [AuthController::class, 'login']);

// rota pública de signup
Route::post('/signup', [AuthController::class, 'signup']);