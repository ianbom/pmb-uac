import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(
    new URL('../resources/js/features/dashboard/data.ts', import.meta.url),
    'utf8',
);
const compiled = ts.transpileModule(source, {
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
    },
}).outputText;
const {
    applicants,
    filterApplicants,
    initialFilters,
    summarize,
    dailyRegistrations,
    DEMO_DATE,
    status,
} = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
);
assert.equal(new Set(applicants.map((a) => a.id)).size, applicants.length);
for (const a of applicants) {
    if (a.documents === 'verified')
        assert.ok(a.payment === 'paid' || a.payment === 'exempt');
    if (a.selected) assert.equal(a.documents, 'verified');
    if (a.enrolled) assert.ok(a.selected);
    assert.ok(status(a));
}
for (const overrides of [
    {},
    { wave: '1' },
    { path: 'Beasiswa' },
    { program: 'Ekonomi Syariah' },
    { year: '2025/2026' },
    { from: '2026-07-15', to: '2026-07-15' },
]) {
    const filters = { ...initialFilters, ...overrides };
    const data = filterApplicants(applicants, filters);
    const summary = summarize(data);
    assert.equal(summary.total, data.length);
    assert.equal(
        summary.demand.reduce((sum, p) => sum + p.count, 0),
        data.length,
    );
    assert.equal(
        summary.payments.reduce((sum, p) => sum + p.count, 0),
        summary.eligible,
    );
    assert.equal(summary.paid, summary.payments[0].count);
    summary.funnel.forEach((count, i) => {
        if (i) assert.ok(count <= summary.funnel[i - 1]);
    });
    for (const days of [7, 30, 90]) {
        const trend = dailyRegistrations(data, DEMO_DATE, days);
        assert.equal(trend.length, days);
        assert.equal(trend.at(-1).date, DEMO_DATE);
        assert.equal(
            trend.reduce((sum, d) => sum + d.count, 0),
            data.filter((a) => a.date >= trend[0].date).length,
        );
    }
}
assert.deepEqual(
    filterApplicants(applicants, {
        ...initialFilters,
        from: '2030-01-01',
        to: '2030-01-02',
    }),
    [],
);
assert.equal(summarize([]).total, 0);
console.log(
    'PMB dashboard: data invariants, global filters, payment partition, funnel, daily trends, empty state passed.',
);
