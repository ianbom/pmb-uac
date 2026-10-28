<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_template_pages_require_authentication(): void
    {
        foreach (['tasks', 'users', 'apps', 'chats', 'help-center', 'settings/account', 'settings/notifications', 'settings/display', 'demo/auth/sign-in-2', 'demo/auth/otp', 'demo/errors/404'] as $path) {
            $this->get('/'.$path)->assertRedirect(route('login'));
        }
    }

    public function test_authenticated_users_can_open_template_pages(): void
    {
        $this->actingAs(User::factory()->create());

        foreach (['tasks', 'users', 'apps', 'chats', 'help-center', 'settings/account', 'settings/notifications', 'settings/display'] as $path) {
            $this->get('/'.$path)->assertOk()->assertInertia(fn (Assert $page) => $page->component('admin/template')->where('templatePage', $path));
        }

        foreach (['sign-in', 'sign-in-2', 'sign-up', 'forgot-password', 'otp'] as $variant) {
            $this->get('/demo/auth/'.$variant)->assertOk()->assertInertia(fn (Assert $page) => $page->component('admin/auth-preview')->where('variant', $variant));
        }

        foreach (['401', '403', '404', '500', '503'] as $code) {
            $this->get('/demo/errors/'.$code)->assertOk()->assertInertia(fn (Assert $page) => $page->component('admin/error-preview')->where('code', $code));
        }
    }

    public function test_unknown_previews_are_not_registered(): void
    {
        $this->actingAs(User::factory()->create());
        $this->get('/demo/auth/unknown')->assertNotFound();
        $this->get('/demo/errors/999')->assertNotFound();
    }
}
