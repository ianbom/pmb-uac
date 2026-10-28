import { useEffect, type PropsWithChildren } from 'react';
import { DirectionProvider } from '@/admin/context/direction-provider';
import { FontProvider } from '@/admin/context/font-provider';
import { TooltipProvider } from '@/admin/components/ui/tooltip';

export function AdminProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.adminTheme = 'true';
        return () => {
            delete root.dataset.adminTheme;
        };
    }, []);

    return (
        <DirectionProvider>
            <FontProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </FontProvider>
        </DirectionProvider>
    );
}
