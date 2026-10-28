<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPagesTest extends TestCase
{
    use RefreshDatabase;

    private const PAGES = [
        'tasks' => 'admin.tasks',
        'users' => 'admin.users',
        'apps' => 'admin.apps',
        'chats' => 'admin.chats',
        'help-center' => 'admin.help-center',
        'settings/account' => 'admin.settings.account',
        'settings/notifications' => 'admin.settings.notifications',
        'settings/display' => 'admin.settings.display',
    ];

    public function test_admin_pages_require_authentication(): void
    {
        foreach (self::PAGES as $path => $name) {
            $this->assertSame(url($path), route($name));
            $this->get('/'.$path)->assertRedirect(route('login'));
        }
    }

    public function test_authenticated_users_can_open_dedicated_pages(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        foreach (self::PAGES as $path => $name) {
            $this->get(route($name))->assertOk()->assertInertia(fn (Assert $page) => $page
                ->component($path)
                ->missing('templatePage')
                ->where('auth.user.name', $user->name)
                ->where('auth.user.email', $user->email));
        }
    }

    public function test_preview_routes_are_not_registered(): void
    {
        $paths = [
            'demo/auth/sign-in', 'demo/auth/sign-in-2', 'demo/auth/sign-up',
            'demo/auth/forgot-password', 'demo/auth/otp',
            'demo/errors/401', 'demo/errors/403', 'demo/errors/404',
            'demo/errors/500', 'demo/errors/503',
        ];

        foreach ($paths as $path) {
            $this->get('/'.$path)->assertNotFound();
        }

        $this->actingAs(User::factory()->create());

        foreach ($paths as $path) {
            $this->get('/'.$path)->assertNotFound();
        }
    }
}
