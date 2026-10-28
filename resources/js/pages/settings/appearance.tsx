import { Head } from '@inertiajs/react';
import { SettingsAppearance } from '@/features/settings/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />
            <SettingsAppearance />
        </>
    );
}
