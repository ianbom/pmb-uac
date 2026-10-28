import { Head } from '@inertiajs/react';
import { SettingsAppearance } from '@/admin/features/settings/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />
            <SettingsAppearance />
        </>
    );
}
