import { Head } from '@inertiajs/react';
import { Dashboard as AdminDashboard } from '@/features/dashboard';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AdminDashboard />
        </>
    );
}
