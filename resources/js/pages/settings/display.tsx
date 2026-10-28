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
