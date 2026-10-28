# Instruction: Refactor & Consolidate Admin Dashboard to Native Laravel Inertia

Refactor the admin dashboard in this repository: eliminate the temporary `resources/js/admin/` directory abstraction, consolidate CSS and UI components, eliminate demo multiplexers/banners/mocks, integrate all admin routes directly into `routes/web.php`, and create dedicated flat Inertia page components.

Execute all changes cleanly and verify using automated tests and type checking.

---

## 1. Routes Consolidation

1. **Edit `routes/web.php`**:
   - Remove `require __DIR__.'/admin.php';`.
   - Inside the existing `Route::middleware(['auth'])->group(...)`, register each admin route explicitly (do NOT use `foreach` loops):
     ```php
     Route::inertia('tasks', 'tasks')->name('admin.tasks');
     Route::inertia('users', 'users')->name('admin.users');
     Route::inertia('apps', 'apps')->name('admin.apps');
     Route::inertia('chats', 'chats')->name('admin.chats');
     Route::inertia('help-center', 'help-center')->name('admin.help-center');
     Route::inertia('settings/account', 'settings/account')->name('admin.settings.account');
     Route::inertia('settings/notifications', 'settings/notifications')->name('admin.settings.notifications');
     Route::inertia('settings/display', 'settings/display')->name('admin.settings.display');
     ```
   - Do NOT include any demo preview routes (`demo/auth/*` or `demo/errors/*`).
2. **Delete `routes/admin.php`**.

---

## 2. CSS Consolidation

1. **Update `resources/css/app.css`**:
   - Remove `@import './admin.css';` from line 4.
   - In `@theme`:
     - Add `--font-inter: 'Inter', 'sans-serif';`
     - Add `--font-manrope: 'Manrope', 'sans-serif';`
     - Add `--radius-xl: calc(var(--radius) + 4px);`
   - In `:root` and `.dark`:
     - Incorporate the complete OKLCH color token set from `resources/css/admin.css` (primary, secondary, accent, muted, destructive, sidebar variables, etc.).
   - Add custom utilities:
     - `@utility container { margin-inline: auto; padding-inline: 2rem; @media (width >= 1400px) { max-width: 1400px; } }`
     - `@utility no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; } }`
     - `@utility faded-bottom { mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%); }`
   - Add Radix collapsible animation utilities & keyframes:
     - `.CollapsibleContent { overflow: hidden; }`
     - `.CollapsibleContent[data-state='open'] { animation: slideDown 300ms ease-out; }`
     - `.CollapsibleContent[data-state='closed'] { animation: slideUp 300ms ease-out; }`
     - `@keyframes slideDown { from { height: 0; } to { height: var(--radix-collapsible-content-height); } }`
     - `@keyframes slideUp { from { height: var(--radix-collapsible-content-height); } to { height: 0; } }`
   - In `@layer base`:
     - Add thin scrollbar style: `* { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }`
     - Add body scroll-lock override: `body[data-scroll-locked] { overflow: unset !important; }`
     - Add cursor pointer rule: `button:not(:disabled), [role='button']:not(:disabled) { cursor: pointer; }`
     - Add mobile input zoom prevention: `@media (max-width: 767px) { input, select, textarea { font-size: 16px !important; } }`
2. **Delete `resources/css/admin.css`**.

---

## 3. UI Component Consolidation (`resources/js/components/ui/`)

1. **Resolve 18 Overlapping UI Components**:
   The following 18 components exist in both `resources/js/admin/components/ui/` and `resources/js/components/ui/`:
   `alert.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `checkbox.tsx`, `collapsible.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input-otp.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `tooltip.tsx`.
   - Overwrite these in `resources/js/components/ui/` using the enhanced admin versions (which include proper OKLCH dark mode styling and Radix animations).
   - Ensure all internal import references in these files point to `@/lib/utils`, `@/hooks/use-mobile`, and `@/components/ui/*`.
2. **Move 11 Admin-Only UI Components**:
   Move from `resources/js/admin/components/ui/` to `resources/js/components/ui/`:
   - `alert-dialog.tsx`, `calendar.tsx`, `command.tsx`, `form.tsx`, `popover.tsx`, `radio-group.tsx`, `scroll-area.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`.
3. **Preserve Starter Kit UI Components**:
   Ensure existing starter kit UI components remain intact:
   - `breadcrumb.tsx`, `icon.tsx`, `navigation-menu.tsx`, `placeholder-pattern.tsx`, `sonner.tsx`, `spinner.tsx`, `toggle-group.tsx`, `toggle.tsx`.

---

## 4. Dissolve `resources/js/admin/` into Root `resources/js/`

1. **Assets**:
   - Move `resources/js/admin/assets/logo.tsx` → `resources/js/assets/logo.tsx`.
   - Move `resources/js/admin/assets/custom/*` → `resources/js/assets/custom/*`.
   - Move `resources/js/admin/assets/brand-icons/*` → `resources/js/assets/brand-icons/*`.
2. **Context**:
   - Move all context providers from `resources/js/admin/context/*` to `resources/js/context/*`:
     - `direction-provider.tsx`, `font-provider.tsx`, `layout-provider.tsx`, `search-provider.tsx`, `theme-provider.tsx`.
3. **Hooks**:
   - Move `use-dialog-state.tsx` and `use-table-url-state.ts` to `resources/js/hooks/`.
   - Rename and move `use-demo-search.ts` → `resources/js/hooks/use-table-search.ts` (export `useTableSearch` and alias `useDemoSearch` for compatibility).
   - Retain the root SSR-safe `resources/js/hooks/use-mobile.tsx`.
4. **Lib**:
   - In `resources/js/lib/utils.ts`: merge additional utility functions from `resources/js/admin/lib/utils.ts` (`sleep`, `getPageNumbers`, `getDisplayNameInitials`).
   - Move `cookies.ts`, `csv.ts`, `navigation.ts`, and `show-submitted-data.tsx` to `resources/js/lib/`.
5. **Components**:
   - Move `resources/js/admin/components/data-table/*` → `resources/js/components/data-table/*`.
   - Move `resources/js/admin/components/layout/*` → `resources/js/components/layout/*`.
   - Move root admin components to `resources/js/components/`:
     `admin-provider.tsx`, `coming-soon.tsx`, `command-menu.tsx`, `config-drawer.tsx`, `confirm-dialog.tsx`, `date-picker.tsx`, `long-text.tsx`, `password-input.tsx`, `profile-dropdown.tsx`, `search.tsx`, `select-dropdown.tsx`, `sign-out-dialog.tsx`, `skip-to-main.tsx`, `theme-switch.tsx`.
6. **Features**:
   - Move feature modules to `resources/js/features/`:
     - `resources/js/admin/features/dashboard` → `resources/js/features/dashboard`
     - `resources/js/admin/features/tasks` → `resources/js/features/tasks`
     - `resources/js/admin/features/users` → `resources/js/features/users`
     - `resources/js/admin/features/apps` → `resources/js/features/apps`
     - `resources/js/admin/features/chats` → `resources/js/features/chats`
     - `resources/js/admin/features/settings` → `resources/js/features/settings`
   - Delete demo-only features: `resources/js/admin/features/auth` and `resources/js/admin/features/errors`.
7. **Type Declarations**:
   - Move `resources/js/admin/tanstack-table.d.ts` → `resources/js/types/tanstack-table.d.ts`.
8. **Delete Directory**:
   - Delete the entire `resources/js/admin/` folder.

---

## 5. Remove Demo Banners, Labels & Hardcoded Mocks

1. **Authenticated Layout**:
   - In `resources/js/components/layout/authenticated-layout.tsx`, delete the top demo announcement banner:
     ```tsx
     <div className="border-b bg-muted/30 px-4 py-1 text-xs text-muted-foreground">
       Shadcn Admin demo · Sample data resets on reload...
     </div>
     ```
2. **Sidebar Navigation**:
   - In `resources/js/components/layout/data/sidebar-data.ts`:
     - Remove the entire `Pages` navigation group containing demo auth and error links.
     - Remove the hardcoded user mock (`satnaingdev@gmail.com`).
3. **Real User Binding**:
   - In `resources/js/components/layout/app-sidebar.tsx`:
     - Access authentic user session data using Inertia `const { auth } = usePage<SharedData>().props;`.
     - Pass the real user profile into `<NavUser user={{ name: auth.user.name, email: auth.user.email, avatar: '' }} />`.
4. **Form Submit Feedback**:
   - In `resources/js/lib/show-submitted-data.tsx`:
     - Change the default toast title from `"You submitted the following values:"` and remove `"Demo only: values are not saved to the server."`.
5. **Feature Cleanup**:
   - In `tasks`, `users`, and `chats` feature components:
     - Remove toast and dialog strings referencing "Demo only", "local demo only", and "unavailable in demo".
   - In `resources/js/features/dashboard/components/analytics.tsx`:
     - Rename CSV export filename from `dashboard-demo.csv` to `dashboard-analytics.csv`.
6. **Inertia Layout Configuration**:
   - In `resources/js/app.tsx`:
     - Remove `case name === 'admin/auth-preview' || name === 'admin/error-preview': return AdminProvider;`.
     - Update all layout imports from `@/admin/...` to `@/...`.

---

## 6. Create Dedicated Flat Inertia Pages in `resources/js/pages/`

1. **Delete Demo Pages**:
   - Delete `resources/js/pages/admin/` (including `template.tsx`, `auth-preview.tsx`, `error-preview.tsx`).
2. **Create Standalone Flat Page Components**:
   - `resources/js/pages/tasks.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { Tasks } from '@/features/tasks';

     export default function TasksPage() {
         return (
             <>
                 <Head title="Tasks" />
                 <Tasks />
             </>
         );
     }
     ```
   - `resources/js/pages/users.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { Users } from '@/features/users';

     export default function UsersPage() {
         return (
             <>
                 <Head title="Users" />
                 <Users />
             </>
         );
     }
     ```
   - `resources/js/pages/apps.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { Apps } from '@/features/apps';

     export default function AppsPage() {
         return (
             <>
                 <Head title="Apps" />
                 <Apps />
             </>
         );
     }
     ```
   - `resources/js/pages/chats.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { Chats } from '@/features/chats';

     export default function ChatsPage() {
         return (
             <>
                 <Head title="Chats" />
                 <Chats />
             </>
         );
     }
     ```
   - `resources/js/pages/help-center.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { ComingSoon } from '@/components/coming-soon';

     export default function HelpCenterPage() {
         return (
             <>
                 <Head title="Help Center" />
                 <ComingSoon />
             </>
         );
     }
     ```
   - `resources/js/pages/settings/account.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { SettingsAccount } from '@/features/settings/account';

     export default function AccountSettingsPage() {
         return (
             <>
                 <Head title="Account Settings" />
                 <SettingsAccount />
             </>
         );
     }
     ```
   - `resources/js/pages/settings/notifications.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { SettingsNotifications } from '@/features/settings/notifications';

     export default function NotificationsSettingsPage() {
         return (
             <>
                 <Head title="Notification Settings" />
                 <SettingsNotifications />
             </>
         );
     }
     ```
   - `resources/js/pages/settings/display.tsx`:
     ```tsx
     import { Head } from '@inertiajs/react';
     import { SettingsDisplay } from '@/features/settings/display';

     export default function DisplaySettingsPage() {
         return (
             <>
                 <Head title="Display Settings" />
                 <SettingsDisplay />
             </>
         );
     }
     ```
3. **Update Existing Pages**:
   - In `resources/js/pages/dashboard.tsx` and `resources/js/pages/settings/appearance.tsx`:
     - Update import paths from `@/admin/features/...` to `@/features/...`.

---

## 7. Global Import Path Fixes

1. Across all `.ts` and `.tsx` files in `resources/js/`:
   - Replace all occurrences of `'@/admin/` and `"@/admin/` with `'@/` and `"@/`.
2. In `tests/admin-csv.test.mjs`:
   - Update import path from `../resources/js/admin/lib/csv.ts` to `../resources/js/lib/csv.ts`.

---

## 8. Automated Verification & Testing

1. **Update `tests/Feature/AdminPagesTest.php`**:
   - Replace assertions expecting `admin/template` with assertions targeting the individual Inertia page components:
     - `/tasks` → `$page->component('tasks')`
     - `/users` → `$page->component('users')`
     - `/apps` → `$page->component('apps')`
     - `/chats` → `$page->component('chats')`
     - `/help-center` → `$page->component('help-center')`
     - `/settings/account` → `$page->component('settings/account')`
     - `/settings/notifications` → `$page->component('settings/notifications')`
     - `/settings/display` → `$page->component('settings/display')`
   - Remove obsolete test methods for demo auth and demo error preview routes.
2. **Execute Quality Checks**:
   - Run PHP feature tests:
     ```bash
     php artisan test --filter=AdminPagesTest
     ```
   - Run TypeScript type checks and build verification:
     ```bash
     npm run check
     npm run types:check
     npm run build
     ```
