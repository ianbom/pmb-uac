import { useState } from 'react';
import type { NavigateFn } from './use-table-url-state';

type TableSearch = {
    filter?: string;
    sort?: 'asc' | 'desc';
    type?: 'all' | 'connected' | 'notConnected';
    [key: string]: unknown;
};

export function useTableSearch(
    initial: TableSearch = {},
): [TableSearch, NavigateFn] {
    const [search, setSearch] = useState(initial);
    const navigate: NavigateFn = ({ search: update }) => {
        if (update === true) return;
        setSearch((previous) => ({
            ...previous,
            ...(typeof update === 'function' ? update(previous) : update),
        }));
    };
    return [search, navigate];
}

export const useDemoSearch = useTableSearch;
