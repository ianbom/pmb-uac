import { Badge } from '@/components/ui/badge';
import { ConfigDrawer } from '@/components/config-drawer';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const columns = [
    'No. Pendaftaran',
    'Nama Pendaftar',
    'Program Studi',
    'Gelombang',
    'Jalur Pendaftaran',
    'Status Berkas',
    'Status Pembayaran',
    'Tanggal Daftar',
];

const applicants = [
    {
        id: 'PMB-2026-001',
        name: 'Ahmad Fikri',
        program: 'Teknik Informatika',
        wave: 'Gelombang 1',
        track: 'Reguler',
        documents: 'Terverifikasi',
        payment: 'Lunas',
        date: '01 November 2026',
    },
    {
        id: 'PMB-2026-002',
        name: 'Siti Aisyah',
        program: 'Manajemen',
        wave: 'Gelombang 1',
        track: 'Prestasi',
        documents: 'Menunggu Verifikasi',
        payment: 'Lunas',
        date: '01 November 2026',
    },
    {
        id: 'PMB-2026-003',
        name: 'Muhammad Rizki',
        program: 'Pendidikan Agama Islam',
        wave: 'Gelombang 1',
        track: 'Beasiswa',
        documents: 'Perlu Perbaikan',
        payment: 'Belum Bayar',
        date: '02 November 2026',
    },
    {
        id: 'PMB-2026-004',
        name: 'Nur Azizah',
        program: 'Ekonomi Syariah',
        wave: 'Gelombang 1',
        track: 'Reguler',
        documents: 'Terverifikasi',
        payment: 'Lunas',
        date: '02 November 2026',
    },
    {
        id: 'PMB-2026-005',
        name: 'Dimas Pratama',
        program: 'Teknik Informatika',
        wave: 'Gelombang 2',
        track: 'Reguler',
        documents: 'Menunggu Verifikasi',
        payment: 'Menunggu Konfirmasi',
        date: '03 November 2026',
    },
    {
        id: 'PMB-2026-006',
        name: 'Putri Ramadhani',
        program: 'Manajemen',
        wave: 'Gelombang 2',
        track: 'Beasiswa',
        documents: 'Terverifikasi',
        payment: 'Lunas',
        date: '04 November 2026',
    },
    {
        id: 'PMB-2026-007',
        name: 'Fajar Maulana',
        program: 'Ekonomi Syariah',
        wave: 'Gelombang 2',
        track: 'Prestasi',
        documents: 'Perlu Perbaikan',
        payment: 'Belum Bayar',
        date: '05 November 2026',
    },
    {
        id: 'PMB-2026-008',
        name: 'Intan Permata',
        program: 'Pendidikan Agama Islam',
        wave: 'Gelombang 2',
        track: 'Reguler',
        documents: 'Menunggu Verifikasi',
        payment: 'Lunas',
        date: '06 November 2026',
    },
];

export function Users() {
    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </Header>

            <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
                <div>
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                        Penerimaan Mahasiswa Baru
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Data Pendaftar
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Daftar calon mahasiswa beserta pilihan program studi dan
                        status pendaftarannya.
                    </p>
                </div>

                <section
                    aria-label="Daftar mahasiswa pendaftar"
                    className="overflow-hidden rounded-xl border bg-card text-card-foreground"
                >
                    <div className="border-b px-4 py-4 sm:px-6">
                        <h2 className="font-semibold">Mahasiswa Pendaftar</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {applicants.length} pendaftar · Data dummy untuk
                            contoh tampilan, bukan data mahasiswa sebenarnya.
                        </p>
                    </div>
                    <Table>
                        <TableCaption className="sr-only">
                            Daftar calon mahasiswa pendaftar PMB UAC
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                {columns.map((column) => (
                                    <TableHead
                                        key={column}
                                        className="px-4 whitespace-nowrap"
                                    >
                                        {column}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.map((applicant) => (
                                <TableRow key={applicant.id}>
                                    <TableCell className="px-4 font-medium whitespace-nowrap">
                                        {applicant.id}
                                    </TableCell>
                                    <TableCell className="px-4 whitespace-nowrap">
                                        {applicant.name}
                                    </TableCell>
                                    <TableCell className="px-4 whitespace-nowrap">
                                        {applicant.program}
                                    </TableCell>
                                    <TableCell className="px-4 whitespace-nowrap">
                                        {applicant.wave}
                                    </TableCell>
                                    <TableCell className="px-4">
                                        {applicant.track}
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <Badge
                                            variant={
                                                applicant.documents ===
                                                'Terverifikasi'
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            className="whitespace-nowrap"
                                        >
                                            {applicant.documents}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4">
                                        <Badge
                                            variant={
                                                applicant.payment === 'Lunas'
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            className="whitespace-nowrap"
                                        >
                                            {applicant.payment}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 whitespace-nowrap">
                                        {applicant.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </Main>
        </>
    );
}
