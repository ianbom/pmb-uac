import { toast } from 'sonner';

export function showSubmittedData(
    data: unknown,
    title: string = 'Form submitted',
) {
    toast.message(title, {
        description: (
            <pre className="mt-2 w-full overflow-x-auto rounded-md bg-muted p-4">
                <code className="text-foreground">
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
