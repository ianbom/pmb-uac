import { Link } from '@inertiajs/react';
import { AdminProvider } from '@/components/admin-provider';
import { GraduationCap } from 'lucide-react';
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
                    <Link
                        href="/"
                        className="mb-4 flex items-center justify-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg bg-highlight text-highlight-foreground">
                            <GraduationCap
                                className="size-6"
                                aria-hidden="true"
                            />
                        </span>
                        <span>
                            <span className="block text-xl font-semibold">
                                PMB UAC
                            </span>
                            <span className="block text-xs text-muted-foreground">
                                Penerimaan Mahasiswa Baru
                            </span>
                        </span>
                    </Link>
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
