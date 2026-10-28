import { Link } from '@inertiajs/react';
import { AdminProvider } from '@/admin/components/admin-provider';
import { AuthLayout as TemplateAuthLayout } from '@/admin/features/auth/auth-layout';
import { ThemeSwitch } from '@/admin/components/theme-switch';
import type { AuthLayoutProps } from '@/types';

export default function AuthLayout({
    children,
    title = '',
    description = '',
}: AuthLayoutProps) {
    return (
        <AdminProvider>
            <div className="fixed end-4 top-4">
                <ThemeSwitch />
            </div>
            <TemplateAuthLayout>
                <div className="mx-auto w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                    <div className="space-y-2 text-start">
                        <h2 className="text-lg font-semibold tracking-tight">
                            {title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
                <p className="mx-auto mt-4 max-w-sm text-center text-sm text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <Link href="/" className="underline underline-offset-4">
                        Terms of Service and Privacy Policy
                    </Link>
                    .
                </p>
            </TemplateAuthLayout>
        </AdminProvider>
    );
}
