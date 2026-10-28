import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import {
    getDisplayNameInitials,
    getPageNumbers,
    sleep,
    toUrl,
} from '../resources/js/lib/utils.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'resources/js');

for (const path of [
    'resources/js/admin',
    'resources/js/pages/admin',
    'resources/css/admin.css',
    'routes/admin.php',
]) {
    assert.equal(
        existsSync(join(root, path)),
        false,
        `${path} must not return`,
    );
}

function inspectImports(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) inspectImports(path);
        else if (/\.tsx?$/.test(entry.name)) {
            assert.doesNotMatch(readFileSync(path, 'utf8'), /@\/admin\//, path);
        }
    }
}

inspectImports(source);

for (const page of [
    'tasks',
    'users',
    'apps',
    'chats',
    'help-center',
    'settings/account',
    'settings/notifications',
    'settings/display',
]) {
    assert.ok(existsSync(join(source, `pages/${page}.tsx`)), page);
}

for (const name of [
    'breadcrumb',
    'icon',
    'navigation-menu',
    'placeholder-pattern',
    'sonner',
    'spinner',
    'toggle-group',
    'toggle',
]) {
    assert.ok(existsSync(join(source, `components/ui/${name}.tsx`)), name);
}

assert.doesNotMatch(
    readFileSync(
        join(source, 'components/layout/data/sidebar-data.ts'),
        'utf8',
    ),
    /\/demo\/|satnaingdev@gmail\.com|user:/,
);
assert.doesNotMatch(
    readFileSync(join(root, 'resources/css/app.css'), 'utf8'),
    /data-admin-theme|admin\.css/,
);
assert.match(
    readFileSync(join(source, 'hooks/use-table-search.ts'), 'utf8'),
    /export const useDemoSearch = useTableSearch/,
);
assert.match(
    readFileSync(join(source, 'components/password-input.tsx'), 'utf8'),
    /export default PasswordInput/,
);
assert.equal(toUrl('/tasks'), '/tasks');
assert.equal(toUrl({ url: '/users', method: 'get' }), '/users');
assert.equal(getDisplayNameInitials('  '), '?');
assert.equal(getDisplayNameInitials('Adi'), 'AD');
assert.equal(getDisplayNameInitials(' Budi  Setiawan '), 'BS');
assert.deepEqual(getPageNumbers(1, 0), []);
assert.deepEqual(getPageNumbers(2, 4), [1, 2, 3, 4]);
assert.deepEqual(getPageNumbers(1, 10), [1, 2, 3, 4, '...', 10]);
assert.deepEqual(getPageNumbers(5, 10), [1, '...', 4, 5, 6, '...', 10]);
assert.deepEqual(getPageNumbers(10, 10), [1, '...', 7, 8, 9, 10]);
await sleep(0);

console.log('Admin consolidation checks passed.');
