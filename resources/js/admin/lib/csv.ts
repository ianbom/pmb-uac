type CsvRow = Record<string, string | number | boolean | null | undefined>;

export function toCsv(rows: CsvRow[]): string {
    if (!rows.length) return '';
    const columns = Object.keys(rows[0]);
    const escape = (value: CsvRow[string]) => {
        const text = String(value ?? '');
        const safe = /^[\s]*[=+@-]|^[\t\r]/.test(text) ? `'${text}` : text;
        return `"${safe.replaceAll('"', '""')}"`;
    };
    return [columns, ...rows.map((row) => columns.map((column) => row[column]))]
        .map((row) => row.map(escape).join(','))
        .join('\r\n');
}

export function downloadCsv(filename: string, rows: CsvRow[]) {
    const url = URL.createObjectURL(
        new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
