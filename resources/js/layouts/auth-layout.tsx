import { Link } from '@inertiajs/react';
import { AdminProvider } from '@/components/admin-provider';
import { Logo } from '@/assets/logo';
import { ThemeSwitch } from '@/components/theme-switch';
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
            <div className="container grid min-h-svh max-w-none items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8">
                    <div className="mb-4 flex items-center justify-center">
                        <Logo className="me-2" />
                        <h1 className="text-xl font-medium">Shadcn Admin</h1>
                    </div>
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
                </div>
            </div>
        </AdminProvider>
    );
}
