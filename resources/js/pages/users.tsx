import { Head } from '@inertiajs/react';
import { Users } from '@/features/users';

export default function UsersPage() {
    return (
        <>
            <Head title="Users" />
            <Users />
        </>
    );
}
