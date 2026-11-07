import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sidebarData } from '../resources/js/components/layout/data/sidebar-data.ts';

assert.deepEqual(
    sidebarData.navGroups.map((group) => ({
        title: group.title,
        items: group.items.map((item) => item.title),
    })),
    [
        { title: 'Utama', items: ['Dashboard'] },
        {
            title: 'Peserta',
            items: [
                'Data Pendaftar',
                'Verifikasi Berkas',
                'Seleksi & Penilaian',
                'Daftar Ulang',
            ],
        },
        {
            title: 'Pendaftaran',
            items: [
                'Gelombang Pendaftaran',
                'Jalur Pendaftaran',
                'Program Studi & Kuota',
            ],
        },
        { title: 'Keuangan', items: ['Pembayaran', 'Beasiswa'] },
        {
            title: 'Informasi',
            items: ['Pengumuman', 'Notifikasi', 'Konten Website'],
        },
        { title: 'Laporan', items: ['Laporan & Statistik'] },
        { title: 'Pengaturan', items: ['Manajemen Admin', 'Pengaturan'] },
    ],
);
const items = sidebarData.navGroups.flatMap((group) => group.items);
assert.equal(items.length, 16);
assert.equal(items[0].url, '/dashboard');
assert.equal(
    items.find((item) => item.title === 'Data Pendaftar').url,
    '/users',
);
assert.equal(
    items.find((item) => item.title === 'Data Pendaftar').disabled,
    undefined,
);
assert.equal(items.filter((item) => item.disabled).length, 13);
for (const item of items.filter((item) => item.disabled)) {
    assert.equal(item.url, undefined);
    assert.ok(item.description);
}
assert.deepEqual(
    items.at(-1).items.map((item) => item.url),
    ['/settings/profile', '/settings/security', '/settings/appearance'],
);

const css = readFileSync(
    new URL('../resources/css/app.css', import.meta.url),
    'utf8',
);
const light = css.split(':root {')[1].split('}')[0];
for (const [token, color] of Object.entries({
    background: '#F7F9F7',
    foreground: '#1F3028',
    card: '#FFFFFF',
    primary: '#123F2D',
    border: '#E3EAE5',
    sidebar: '#123F2D',
    'sidebar-accent': '#EAF3ED',
    'sidebar-accent-foreground': '#123F2D',
    highlight: '#F3CF58',
})) {
    assert.ok(
        light.toLowerCase().includes(`--${token}: ${color};`.toLowerCase()),
        token,
    );
}

function luminance(hex) {
    const channels = hex
        .match(/[\da-f]{2}/gi)
        .map((part) => parseInt(part, 16) / 255)
        .map((value) =>
            value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
        );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
for (const [text, background] of [
    ['#FFFFFF', '#123F2D'],
    ['#123F2D', '#EAF3ED'],
    ['#1F3028', '#F7F9F7'],
    ['#1F3028', '#F3CF58'],
    ['#52665A', '#FFFFFF'],
    ['#B1C6B8', '#172A20'],
]) {
    const values = [luminance(text), luminance(background)].sort(
        (a, b) => b - a,
    );
    assert.ok(
        (values[0] + 0.05) / (values[1] + 0.05) >= 4.5,
        `${text} on ${background}`,
    );
}
console.log('PMB menu, palette and text contrast checks passed.');
