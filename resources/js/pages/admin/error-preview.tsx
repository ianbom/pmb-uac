import { Head } from '@inertiajs/react';
import { UnauthorisedError } from '@/admin/features/errors/unauthorized-error';
import { ForbiddenError } from '@/admin/features/errors/forbidden';
import { NotFoundError } from '@/admin/features/errors/not-found-error';
import { GeneralError } from '@/admin/features/errors/general-error';
import { MaintenanceError } from '@/admin/features/errors/maintenance-error';

const errors = {
    '401': UnauthorisedError,
    '403': ForbiddenError,
    '404': NotFoundError,
    '500': GeneralError,
    '503': MaintenanceError,
};

export default function ErrorPreview({ code }: { code: keyof typeof errors }) {
    const ErrorPage = errors[code];
    return (
        <>
            <Head title={`${code} preview`} />
            <ErrorPage />
        </>
    );
}
