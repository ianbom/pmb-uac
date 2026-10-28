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
