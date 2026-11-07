export type Applicant = {
    id: number;
    registration: string;
    name: string;
    year: string;
    wave: string;
    path: string;
    program: string;
    date: string;
    submitted: boolean;
    documents: 'pending' | 'incomplete' | 'verified';
    payment: 'paid' | 'pending' | 'failed' | 'exempt';
    selected: boolean;
    enrolled: boolean;
};

export type Filters = {
    year: string;
    wave: string;
    path: string;
    program: string;
    from: string;
    to: string;
};
export const DEMO_DATE = '2026-07-15';
export const programs = [
    'Pendidikan Agama Islam',
    'Manajemen Pendidikan Islam',
    'Pendidikan Guru Madrasah Ibtidaiyah',
    'Perbankan Syariah',
    'Ekonomi Syariah',
    'Pendidikan Bahasa Arab',
    'Tadris Bahasa Inggris',
];
export const paths = ['Reguler', 'Prestasi', 'Beasiswa'];
export const initialFilters: Filters = {
    year: '2026/2027',
    wave: 'all',
    path: 'all',
    program: 'all',
    from: '2026-04-17',
    to: DEMO_DATE,
};
const names = [
    'Ahmad Fauzan',
    'Siti Aisyah',
    'Muhammad Rizky',
    'Nur Fatimah',
    'Abdurrahman Hakim',
    'Dewi Lestari',
    'Fajar Ramadhan',
    'Putri Amalia',
    'Hasan Maulana',
    'Zahra Khairunnisa',
    'Rizka Safitri',
    'Yusuf Hidayat',
    'Nabila Az Zahra',
    'Ilham Pratama',
    'Salma Fitriyani',
    'Farhan Akbar',
    'Aulia Rahma',
    'Dimas Saputra',
    'Intan Permatasari',
    'Ali Mustofa',
];
export function shiftDate(date: string, days: number) {
    const value = new Date(`${date}T12:00:00Z`);
    value.setUTCDate(value.getUTCDate() + days);
    return value.toISOString().slice(0, 10);
}

// ponytail: deterministic demo snapshot; replace this array with Inertia props for live data.
export const applicants: Applicant[] = ['2025/2026', '2026/2027'].flatMap(
    (year, y) =>
        Array.from({ length: 342 + y * 96 }, (_, i) => {
            const stage = (i * 7 + Math.floor(i / 9)) % 12;
            const path = paths[(i + Math.floor(i / 7)) % paths.length];
            const payment =
                path === 'Beasiswa'
                    ? 'exempt'
                    : stage >= 3
                      ? 'paid'
                      : stage === 0
                        ? 'failed'
                        : 'pending';
            const verified = stage >= 6;
            return {
                id: y * 1000 + i + 1,
                registration: `UAC-${year.slice(0, 4)}-${String(i + 1).padStart(4, '0')}`,
                name: `${names[i % names.length]} ${['Ananda', 'Nugraha', 'Mubarok', 'Maharani'][Math.floor(i / names.length) % 4]}`,
                year,
                wave: String(1 + (i % 3)),
                path,
                program:
                    programs[(i * 3 + Math.floor(i / 5)) % programs.length],
                date: shiftDate(DEMO_DATE, -((i * 13) % 180)),
                submitted: true,
                documents: verified
                    ? 'verified'
                    : stage === 4
                      ? 'incomplete'
                      : 'pending',
                payment,
                selected: verified && stage >= 8,
                enrolled: verified && stage >= 10,
            };
        }),
);
export function filterApplicants(data: Applicant[], filters: Filters) {
    return data.filter(
        (a) =>
            a.year === filters.year &&
            (filters.wave === 'all' || a.wave === filters.wave) &&
            (filters.path === 'all' || a.path === filters.path) &&
            (filters.program === 'all' || a.program === filters.program) &&
            a.date >= filters.from &&
            a.date <= filters.to,
    );
}
export const percentage = (count: number, total: number) =>
    total ? Math.round((count / total) * 100) : 0;
export const number = (value: number) => value.toLocaleString('id-ID');
export const dateLabel = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
export function status(a: Applicant) {
    if (a.payment === 'pending' || a.payment === 'failed') return 'Belum Bayar';
    if (a.documents === 'incomplete') return 'Berkas Tidak Lengkap';
    return a.documents === 'pending' ? 'Menunggu Verifikasi' : 'Terverifikasi';
}
export function summarize(data: Applicant[]) {
    const submitted = data.filter((a) => a.submitted);
    const cleared = submitted.filter(
        (a) => a.payment === 'paid' || a.payment === 'exempt',
    );
    const verified = cleared.filter((a) => a.documents === 'verified');
    const selected = verified.filter((a) => a.selected);
    return {
        total: data.length,
        paid: data.filter((a) => a.payment === 'paid').length,
        eligible: data.filter((a) => a.payment !== 'exempt').length,
        pending: cleared.filter((a) => a.documents === 'pending').length,
        funnel: [
            submitted.length,
            cleared.length,
            verified.length,
            selected.length,
            selected.filter((a) => a.enrolled).length,
        ],
        demand: programs
            .map((name) => ({
                name,
                count: data.filter((a) => a.program === name).length,
            }))
            .sort((a, b) => b.count - a.count),
        payments: [
            {
                name: 'Lunas',
                count: data.filter((a) => a.payment === 'paid').length,
                fill: 'var(--chart-1)',
            },
            {
                name: 'Menunggu Pembayaran',
                count: data.filter((a) => a.payment === 'pending').length,
                fill: 'var(--chart-2)',
            },
            {
                name: 'Gagal / Kedaluwarsa',
                count: data.filter((a) => a.payment === 'failed').length,
                fill: 'var(--payment-failed)',
            },
        ],
    };
}
export function dailyRegistrations(
    data: Applicant[],
    end: string,
    days: number,
) {
    const counts = new Map<string, number>();
    data.forEach((a) => counts.set(a.date, (counts.get(a.date) ?? 0) + 1));
    return Array.from({ length: days }, (_, i) => {
        const date = shiftDate(end, i - days + 1);
        return { date, count: counts.get(date) ?? 0 };
    });
}
export const events = [
    {
        date: '2026-07-18',
        title: 'Penutupan gelombang 2',
        description: 'Batas pengiriman formulir dan kelengkapan berkas.',
        wave: '2',
    },
    {
        date: '2026-07-22',
        title: 'Ujian masuk gelombang 2',
        description: 'Tes potensi akademik dan wawancara calon mahasiswa.',
        wave: '2',
    },
    {
        date: '2026-07-25',
        title: 'Pengumuman hasil seleksi',
        description: 'Hasil seleksi tersedia pada portal pendaftaran.',
        wave: '2',
    },
    {
        date: '2026-08-05',
        title: 'Batas daftar ulang',
        description: 'Konfirmasi penerimaan dan penyelesaian daftar ulang.',
        wave: '3',
    },
];
