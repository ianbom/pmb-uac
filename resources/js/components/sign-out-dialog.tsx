import { router } from '@inertiajs/react';
import { logout } from '@/routes';
import { ConfirmDialog } from '@/components/confirm-dialog';

type SignOutDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Sign out"
            desc="Are you sure you want to sign out? You will need to sign in again to access your account."
            confirmText="Sign out"
            destructive
            handleConfirm={() => router.post(logout().url)}
            className="sm:max-w-sm"
        />
    );
}
