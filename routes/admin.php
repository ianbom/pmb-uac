<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    foreach (['tasks', 'users', 'apps', 'chats', 'help-center', 'settings/account', 'settings/notifications', 'settings/display'] as $path) {
        Route::inertia($path, 'admin/template', ['templatePage' => $path])->name('admin.'.str_replace('/', '.', $path));
    }

    Route::get('demo/auth/{variant}', function (string $variant) {
        return inertia('admin/auth-preview', ['variant' => $variant]);
    })->whereIn('variant', ['sign-in', 'sign-in-2', 'sign-up', 'forgot-password', 'otp'])->name('admin.auth-preview');

    Route::get('demo/errors/{code}', function (string $code) {
        return inertia('admin/error-preview', ['code' => $code]);
    })->whereIn('code', ['401', '403', '404', '500', '503'])->name('admin.error-preview');
});
