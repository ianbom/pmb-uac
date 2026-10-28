import { Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/admin/components/ui/card';
import { AuthLayout } from '../auth-layout';
import { UserAuthForm } from './components/user-auth-form';

export function SignIn() {
    return (
        <AuthLayout>
            <Card className="max-w-sm gap-4">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">
                        Sign in
                    </CardTitle>
                    <CardDescription>
                        Enter your email and password below to log into{' '}
                        <br className="max-sm:hidden" /> your account. Don't
                        have an account?{' '}
                        <Link
                            href="/demo/auth/sign-up"
                            className="text-nowrap underline underline-offset-4 hover:text-primary"
                        >
                            Sign Up
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UserAuthForm />
                </CardContent>
                <CardFooter>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking sign in, you agree to our{' '}
                        <a
                            href="/help-center"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="/help-center"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
        </AuthLayout>
    );
}
