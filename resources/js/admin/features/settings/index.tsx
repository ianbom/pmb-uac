import type { PropsWithChildren } from 'react';
import { Monitor, Bell, Palette, Wrench, UserCog } from 'lucide-react';
import { Separator } from '@/admin/components/ui/separator';
import { ConfigDrawer } from '@/admin/components/config-drawer';
import { Header } from '@/admin/components/layout/header';
import { Main } from '@/admin/components/layout/main';
import { ProfileDropdown } from '@/admin/components/profile-dropdown';
import { Search } from '@/admin/components/search';
import { ThemeSwitch } from '@/admin/components/theme-switch';
import { SidebarNav } from './components/sidebar-nav';

const sidebarNavItems = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: <UserCog size={18} />,
    },
    {
        title: 'Security',
        href: '/settings/security',
        icon: <Wrench size={18} />,
    },
    {
        title: 'Account',
        href: '/settings/account',
        icon: <Wrench size={18} />,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: <Palette size={18} />,
    },
    {
        title: 'Notifications',
        href: '/settings/notifications',
        icon: <Bell size={18} />,
    },
    {
        title: 'Display',
        href: '/settings/display',
        icon: <Monitor size={18} />,
    },
];

export function Settings({ children }: PropsWithChildren) {
    return (
        <>
            {/* ===== Top Heading ===== */}
            <Header>
                <Search className="me-auto" />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </Header>

            <Main fixed>
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-4 lg:my-6" />
                <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="top-0 lg:sticky lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex w-full min-w-0 overflow-y-auto p-1">
                        <div className="w-full max-w-2xl pb-8">{children}</div>
                    </div>
                </div>
            </Main>
        </>
    );
}
