'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { showSubmittedData } from '@/admin/lib/show-submitted-data';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/admin/components/ui/alert';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import { ConfirmDialog } from '@/admin/components/confirm-dialog';
import { useUsers } from './users-provider';
import { type User } from '../data/schema';

type UserDeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: User;
};

export function UsersDeleteDialog({
    open,
    onOpenChange,
    currentRow,
}: UserDeleteDialogProps) {
    const [value, setValue] = useState('');
    const { setRecords } = useUsers();

    const handleDelete = () => {
        if (value.trim() !== currentRow.username) return;

        setRecords((previous) =>
            previous.filter((item) => item.id !== currentRow.id),
        );
        setValue('');
        onOpenChange(false);
        showSubmittedData(currentRow, 'Deleted from the local demo only:');
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            form="users-delete-form"
            disabled={value.trim() !== currentRow.username}
            title={
                <span className="text-destructive">
                    <AlertTriangle
                        className="me-1 inline-block stroke-destructive"
                        size={18}
                    />{' '}
                    Delete User
                </span>
            }
            desc={
                <form
                    id="users-delete-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete();
                    }}
                    className="space-y-4"
                >
                    <p className="mb-2">
                        Are you sure you want to delete{' '}
                        <span className="font-bold">{currentRow.username}</span>
                        ?
                        <br />
                        This action will permanently remove the user with the
                        role of{' '}
                        <span className="font-bold">
                            {currentRow.role.toUpperCase()}
                        </span>{' '}
                        from the system. This cannot be undone.
                    </p>

                    <Label className="my-2">
                        Username:
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter username to confirm deletion."
                            autoFocus
                        />
                    </Label>

                    <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Please be careful, this operation can not be rolled
                            back.
                        </AlertDescription>
                    </Alert>
                </form>
            }
            confirmText="Delete"
            destructive
        />
    );
}
