import { useState } from 'react';
import type { NavigateFn } from './use-table-url-state';

type DemoSearch = {
    filter?: string;
    sort?: 'asc' | 'desc';
    type?: 'all' | 'connected' | 'notConnected';
    [key: string]: unknown;
};

export function useDemoSearch(
    initial: DemoSearch = {},
): [DemoSearch, NavigateFn] {
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
