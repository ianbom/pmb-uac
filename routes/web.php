<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('tasks', 'tasks')->name('admin.tasks');
    Route::inertia('users', 'users')->name('admin.users');
    Route::inertia('apps', 'apps')->name('admin.apps');
    Route::inertia('chats', 'chats')->name('admin.chats');
    Route::inertia('help-center', 'help-center')->name('admin.help-center');
    Route::inertia('settings/account', 'settings/account')->name('admin.settings.account');
    Route::inertia('settings/notifications', 'settings/notifications')->name('admin.settings.notifications');
    Route::inertia('settings/display', 'settings/display')->name('admin.settings.display');
});

require __DIR__.'/settings.php';
