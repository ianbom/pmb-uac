import { router } from '@inertiajs/react';

export function useNavigate() {
    return ({ to, replace = false }: { to: string; replace?: boolean }) => {
        router.visit(to, { replace });
    };
}
