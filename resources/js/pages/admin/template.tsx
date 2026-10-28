import { Head } from '@inertiajs/react';
import { Tasks } from '@/admin/features/tasks';
import { Users } from '@/admin/features/users';
import { Apps } from '@/admin/features/apps';
import { Chats } from '@/admin/features/chats';
import { ComingSoon as HelpCenter } from '@/admin/components/coming-soon';
import { SettingsAccount } from '@/admin/features/settings/account';
import { SettingsNotifications } from '@/admin/features/settings/notifications';
import { SettingsDisplay } from '@/admin/features/settings/display';
import SettingsLayout from '@/layouts/settings/layout';

const pages = {
    tasks: Tasks,
    users: Users,
    apps: Apps,
    chats: Chats,
    'help-center': HelpCenter,
    'settings/account': SettingsAccount,
    'settings/notifications': SettingsNotifications,
    'settings/display': SettingsDisplay,
};

export default function TemplatePage({
    templatePage,
}: {
    templatePage: keyof typeof pages;
}) {
    const Page = pages[templatePage];
    const content = <Page key={templatePage} />;
    return (
        <>
            <Head
                title={
                    templatePage.split('/').at(-1)?.replaceAll('-', ' ') ||
                    'Dashboard'
                }
            />
            {templatePage.startsWith('settings/') ? (
                <SettingsLayout>{content}</SettingsLayout>
            ) : (
                content
            )}
        </>
    );
}
