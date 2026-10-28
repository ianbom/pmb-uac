# Shadcn Admin integration

Source: https://github.com/satnaing/shadcn-admin

Snapshot: `e16c87f213a5ba5e45964e9b67c792105ec74d26` (2.2.1).
License: `licenses/shadcn-admin-MIT.txt`. Copyright Sat Naing.

- Components, assets, providers, hooks, utilities, and feature modules live in the standard `resources/js/` directories. Shared UI components use `resources/js/components/ui/`; theme tokens and utilities use `resources/css/app.css` globally.
- `routes/web.php` registers authenticated dashboard routes directly. Each route resolves a dedicated Inertia page. Authentication/error previews and their navigation entries are removed.
- Laravel/Inertia owns authentication, logout, profile/security settings, passkeys, and two-factor authentication. No alternative authentication provider, TanStack Router, mock access tokens, new database tables, or CRUD endpoints.
- Sidebar and profile dropdown identities come from the authenticated Laravel user. Upstream branding, chart values, contacts, and table fixtures remain illustrative.
- Tasks/Users CRUD, bulk changes, Apps connections, and chat messages remain in-memory. Reloading or leaving the page resets their state. These actions do not modify Laravel users, send messages, or send invitations.
- Account/Notifications/Display forms preview submitted values without server persistence. Import previews CSV metadata only; it does not import records. Downloads produce actual CSV files with formula-injection protection.
- Appearance shares the existing Laravel appearance cookie/local storage; font, layout, and direction preferences remain available. Providers and mobile detection retain SSR-safe initialization.
- Seeded fixtures were captured from upstream generators; Faker is not shipped. Public landing content is unchanged, but uses the consolidated global theme and shared UI styling.

Checks: `php artisan test`, `node tests/admin-csv.test.mjs`, `node tests/admin-consolidation.test.mjs`, `npm run check`, `npm run types:check`, `npm run build`, and `npm run build:ssr`.
