import type { PropsWithChildren } from 'react';
import { AdminProvider } from '@/admin/components/admin-provider';
import { AuthenticatedLayout } from '@/admin/components/layout/authenticated-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    children,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AdminProvider>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </AdminProvider>
    );
}
