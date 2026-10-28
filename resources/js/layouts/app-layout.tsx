import type { PropsWithChildren } from 'react';
import { AdminProvider } from '@/components/admin-provider';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
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
