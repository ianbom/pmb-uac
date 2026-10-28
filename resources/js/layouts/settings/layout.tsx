import type { PropsWithChildren } from 'react';
import { Settings } from '@/admin/features/settings';

export default function SettingsLayout({ children }: PropsWithChildren) {
    return <Settings>{children}</Settings>;
}
