import assert from 'node:assert/strict';
import { toCsv } from '../resources/js/lib/csv.ts';

assert.equal(toCsv([]), '');
assert.equal(
    toCsv([{ title: 'a,"b"\nc', value: 0 }]),
    '"title","value"\r\n"a,""b""\nc","0"',
);
assert.equal(
    toCsv([{ value: '=1+1' }, { value: ' +1' }, { value: null }]),
    '"value"\r\n"\'=1+1"\r\n"\' +1"\r\n""',
);
console.log('Admin CSV checks passed.');
