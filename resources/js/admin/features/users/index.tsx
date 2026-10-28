import { useDemoSearch } from '@/admin/hooks/use-demo-search';
import { ConfigDrawer } from '@/admin/components/config-drawer';
import { Header } from '@/admin/components/layout/header';
import { Main } from '@/admin/components/layout/main';
import { ProfileDropdown } from '@/admin/components/profile-dropdown';
import { Search } from '@/admin/components/search';
import { ThemeSwitch } from '@/admin/components/theme-switch';
import { UsersDialogs } from './components/users-dialogs';
import { UsersPrimaryButtons } from './components/users-primary-buttons';
import { UsersProvider } from './components/users-provider';
import { UsersTable } from './components/users-table';

export function Users() {
    const [search, navigate] = useDemoSearch();

    return (
        <UsersProvider>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </Header>

            <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            User List
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your users and their roles here.
                        </p>
                    </div>
                    <UsersPrimaryButtons />
                </div>
                <UsersTable search={search} navigate={navigate} />
            </Main>

            <UsersDialogs />
        </UsersProvider>
    );
}
