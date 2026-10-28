# Shadcn Admin port

Source: https://github.com/satnaing/shadcn-admin

Snapshot: `e16c87f213a5ba5e45964e9b67c792105ec74d26` (2.2.1).
License: `licenses/shadcn-admin-MIT.txt`. Copyright Sat Naing.

- Components and assets retain the upstream visual design; unused source and Clerk integration are omitted.
- Laravel/Inertia owns routing, authentication, real account settings, passkeys, and two-factor authentication. No TanStack Router, mock access tokens, or alternative authentication provider.
- `/dashboard`, `/tasks`, `/users`, `/apps`, `/chats`, and `/help-center` use the existing authenticated shell. Help Center retains the upstream Coming Soon state.
- Tasks and Users support in-memory create/edit/delete and bulk changes. Apps connections and chat messages are local demo state. Reloading or leaving the page resets this state. Demo data never updates Laravel users or sends messages/invitations.
- Import previews CSV file metadata only; it does not claim to import records. Dashboard/task downloads produce actual CSV files with formula-injection protection.
- Profile/security retain existing Laravel endpoints and validation. Appearance shares the existing appearance cookie/local storage; font, layout, and direction retain upstream preferences. Account/Notifications/Display are demo forms without server persistence.
- `/demo/auth/*` and `/demo/errors/*` require authentication. Authentication previews never create a session, user, verification, or password-reset email. Real authentication remains under Laravel's original routes.
- Seeded Tasks/Users fixtures are captured from upstream's Faker generators so Faker is not shipped or installed.
- Styles apply only while an admin/auth page is mounted. The public landing page and its existing components remain unchanged.

Checks: `node tests/admin-csv.test.mjs`, `php artisan test`, `npm run types:check`, `npm run check`, and `npm run build`.
