import { useSyncExternalStore } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useTheme() {
    const { appearance, resolvedAppearance, updateAppearance } =
        useAppearance();
    const hydrated = useSyncExternalStore(
        subscribe,
        clientSnapshot,
        serverSnapshot,
    );
    return {
        defaultTheme: 'system' as const,
        theme: appearance,
        resolvedTheme: hydrated ? resolvedAppearance : ('light' as const),
        setTheme: updateAppearance,
        resetTheme: () => updateAppearance('system'),
    };
}
