import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { type Task } from '../data/schema';
import { tasks } from '../data/tasks';

type TasksDialogType = 'create' | 'update' | 'delete' | 'import';

type TasksContextType = {
    records: Task[];
    setRecords: React.Dispatch<React.SetStateAction<Task[]>>;
    open: TasksDialogType | null;
    setOpen: (str: TasksDialogType | null) => void;
    currentRow: Task | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
};

const TasksContext = React.createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<TasksDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Task | null>(null);
    const [records, setRecords] = useState<Task[]>(tasks);

    return (
        <TasksContext
            value={{
                open,
                setOpen,
                currentRow,
                setCurrentRow,
                records,
                setRecords,
            }}
        >
            {children}
        </TasksContext>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
    const tasksContext = React.useContext(TasksContext);

    if (!tasksContext) {
        throw new Error('useTasks has to be used within <TasksContext>');
    }

    return tasksContext;
};
