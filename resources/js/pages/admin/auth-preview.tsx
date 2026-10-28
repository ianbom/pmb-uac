import { Head, Link } from '@inertiajs/react';
import { SignIn } from '@/admin/features/auth/sign-in';
import { SignIn2 } from '@/admin/features/auth/sign-in/sign-in-2';
import { SignUp } from '@/admin/features/auth/sign-up';
import { ForgotPassword } from '@/admin/features/auth/forgot-password';
import { Otp } from '@/admin/features/auth/otp';

const previews = {
    'sign-in': SignIn,
    'sign-in-2': SignIn2,
    'sign-up': SignUp,
    'forgot-password': ForgotPassword,
    otp: Otp,
};

export default function AuthPreview({
    variant,
}: {
    variant: keyof typeof previews;
}) {
    const Preview = previews[variant];
    return (
        <>
            <Head title="Authentication preview" />
            <div className="fixed inset-x-0 top-0 z-50 bg-muted px-4 py-2 text-center text-xs">
                Template preview only. No credentials are sent or saved.{' '}
                <Link href="/dashboard" className="underline">
                    Back to dashboard
                </Link>
            </div>
            <Preview key={variant} />
        </>
    );
}
