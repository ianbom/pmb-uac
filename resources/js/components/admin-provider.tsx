import { type PropsWithChildren } from 'react';
import { DirectionProvider } from '@/context/direction-provider';
import { FontProvider } from '@/context/font-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function AdminProvider({ children }: PropsWithChildren) {
    return (
        <DirectionProvider>
            <FontProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </FontProvider>
        </DirectionProvider>
    );
}
