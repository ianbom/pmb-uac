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
