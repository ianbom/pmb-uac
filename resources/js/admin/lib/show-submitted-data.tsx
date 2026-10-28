import { toast } from 'sonner';

export function showSubmittedData(
    data: unknown,
    title: string = 'Demo only: values are not saved to the server.',
) {
    toast.message(title, {
        description: (
            <pre className="mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4">
                <code className="text-white">
                    {JSON.stringify(
                        data,
                        (key, value) =>
                            /password|token|secret|otp/i.test(key)
                                ? '[redacted]'
                                : value,
                        2,
                    )}
                </code>
            </pre>
        ),
    });
}
