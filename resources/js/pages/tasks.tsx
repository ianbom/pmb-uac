import { Head } from '@inertiajs/react';
import { Tasks } from '@/features/tasks';

export default function TasksPage() {
    return (
        <>
            <Head title="Tasks" />
            <Tasks />
        </>
    );
}
