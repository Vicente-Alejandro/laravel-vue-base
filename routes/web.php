<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Formulario;

Route::get('/', function () {
    return Inertia::render('App');
});

Route::get('/users', [Formulario::class, 'index'])->name('users.index');
Route::get('/users/create', [Formulario::class, 'create'])->name('users.create');
Route::post('/users', [Formulario::class, 'store'])->name('users.store');

// API Route para JSON
Route::get('/api/users', [Formulario::class, 'apiIndex'])->name('api.users');
