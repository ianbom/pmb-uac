import {
    Component,
    Suspense,
    lazy,
    useMemo,
    useState,
    type ErrorInfo,
    type ReactNode,
} from 'react';
import {
    ArrowDownRight,
    ArrowUpRight,
    Bell,
    CalendarDays,
    CheckCheck,
    CheckCircle2,
    Download,
    FileClock,
    RotateCcw,
    SlidersHorizontal,
    UserRoundPlus,
    Users,
    Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConfigDrawer } from '@/components/config-drawer';
import { Search } from '@/components/search';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import { downloadCsv } from '@/lib/csv';
import { ApplicantsTable } from './components/applicants-table';
import {
    applicants,
    dailyRegistrations,
    dateLabel,
    DEMO_DATE,
    events,
    filterApplicants,
    initialFilters,
    number,
    paths,
    percentage,
    programs,
    shiftDate,
    summarize,
    type Applicant,
    type Filters,
} from './data';

const Trend = lazy(() =>
    import('./components/admission-charts').then((m) => ({
        default: m.RegistrationTrendChart,
    })),
);
const Demand = lazy(() =>
    import('./components/admission-charts').then((m) => ({
        default: m.StudyProgramChart,
    })),
);
const Payments = lazy(() =>
    import('./components/admission-charts').then((m) => ({
        default: m.PaymentStatusChart,
    })),
);

class DashboardBoundary extends Component<
    { children: ReactNode },
    { failed: boolean }
> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Dashboard PMB:', error, info.componentStack);
    }
    render() {
        if (this.state.failed)
            return (
                <Main>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Dashboard tidak dapat ditampilkan
                            </CardTitle>
                            <CardDescription>
                                Terjadi kesalahan pada data atau komponen
                                frontend. Muat ulang halaman untuk mencoba
                                kembali.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => window.location.reload()}>
                                Muat ulang
                            </Button>
                        </CardContent>
                    </Card>
                </Main>
            );
        return this.props.children;
    }
}
function LoadingCharts() {
    return (
        <div
            role="status"
            aria-label="Memuat visualisasi"
            className="space-y-4"
        >
            <span className="sr-only">Memuat dashboard...</span>
            <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24" />
                ))}
            </div>
            <Skeleton className="h-64" />
            <Skeleton className="h-40" />
        </div>
    );
}
function FilterSelect({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}) {
    return (
        <label className="min-w-0 space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
                {label}
            </span>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    aria-label={label}
                    className="w-full min-w-0 bg-card text-xs"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </label>
    );
}
function StatCard({
    title,
    value,
    detail,
    icon: Icon,
    change,
    warning,
}: {
    title: string;
    value: number;
    detail: string;
    icon: typeof Users;
    change?: number | null;
    warning?: boolean;
}) {
    return (
        <Card className="gap-3 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <span
                    className={`rounded-lg p-2 ${warning ? 'bg-highlight/20 text-foreground' : 'bg-secondary text-primary'}`}
                >
                    <Icon className="size-4" />
                </span>
            </CardHeader>
            <CardContent>
                <p className="font-manrope text-3xl font-bold tracking-tight tabular-nums">
                    {number(value)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                    {change !== undefined && change !== null && (
                        <Badge
                            variant="secondary"
                            className="gap-0.5 text-[10px]"
                        >
                            {change < 0 ? (
                                <ArrowDownRight className="size-3" />
                            ) : (
                                <ArrowUpRight className="size-3" />
                            )}
                            {Math.abs(change)}%
                        </Badge>
                    )}
                    {warning && (
                        <Badge className="bg-highlight text-highlight-foreground hover:bg-highlight">
                            Perlu ditinjau
                        </Badge>
                    )}
                    <span>{detail}</span>
                </div>
            </CardContent>
        </Card>
    );
}
function Funnel({ data }: { data: Applicant[] }) {
    const { funnel } = summarize(data);
    const labels = [
        'Formulir Dikirim',
        'Pembayaran Lunas',
        'Berkas Terverifikasi',
        'Lulus Seleksi',
        'Daftar Ulang Selesai',
    ];
    return (
        <Card className="h-full gap-5 shadow-none">
            <CardHeader>
                <CardTitle className="text-base">Alur Konversi PMB</CardTitle>
                <CardDescription className="text-xs">
                    Perjalanan calon mahasiswa hingga daftar ulang.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                {labels.map((label, i) => (
                    <div key={label}>
                        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
                            <span>{label}</span>
                            <span className="font-semibold whitespace-nowrap tabular-nums">
                                {number(funnel[i])}{' '}
                                <span className="ml-1 font-normal text-muted-foreground">
                                    {percentage(funnel[i], funnel[0])}%
                                </span>
                            </span>
                        </div>
                        <div
                            role="progressbar"
                            aria-label={label}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={percentage(funnel[i], funnel[0])}
                            className="h-2 overflow-hidden rounded-full bg-secondary"
                        >
                            <div
                                className="h-full rounded-full bg-chart-1"
                                style={{
                                    width: `${percentage(funnel[i], funnel[0])}%`,
                                    opacity: 1 - i * 0.12,
                                }}
                            />
                        </div>
                    </div>
                ))}
                <p className="border-t pt-3 text-[11px] leading-relaxed text-muted-foreground">
                    Tahapan bersifat kumulatif. Peserta beasiswa bebas biaya
                    dianggap memenuhi tahap pembayaran, bukan transaksi lunas.
                </p>
            </CardContent>
        </Card>
    );
}
function Agenda({ filters }: { filters: Filters }) {
    const visible = events.filter(
        (e) =>
            e.date >= DEMO_DATE &&
            (filters.wave === 'all' || e.wave === filters.wave) &&
            filters.year === '2026/2027',
    );
    return (
        <Card className="h-full shadow-none">
            <CardHeader>
                <CardTitle className="text-base">Agenda PMB</CardTitle>
                <CardDescription className="text-xs">
                    Jadwal simulasi setelah {dateLabel(DEMO_DATE)}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="space-y-5">
                    {visible.map((event, i) => (
                        <li key={event.title} className="flex gap-3">
                            <div
                                className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-lg border ${i === 0 ? 'border-highlight/40 bg-highlight/15' : 'bg-secondary/50'}`}
                            >
                                <span className="text-lg leading-none font-bold tabular-nums">
                                    {event.date.slice(-2)}
                                </span>
                                <span className="mt-1 text-[10px] text-muted-foreground">
                                    {new Date(
                                        `${event.date}T12:00:00`,
                                    ).toLocaleDateString('id-ID', {
                                        month: 'short',
                                    })}
                                </span>
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <p className="text-sm leading-snug font-medium">
                                    {event.title}
                                </p>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {event.description}
                                </p>
                                <Badge
                                    variant="outline"
                                    className="text-[10px]"
                                >
                                    {i === 0 ? 'Terdekat' : 'Terjadwal'} ·
                                    Gelombang {event.wave}
                                </Badge>
                            </div>
                        </li>
                    ))}
                </ol>
                {!visible.length && (
                    <p className="py-8 text-sm text-muted-foreground">
                        Tidak ada agenda mendatang untuk tahun dan gelombang
                        ini.
                    </p>
                )}
                <p className="mt-6 border-t pt-3 text-[11px] text-muted-foreground">
                    Agenda mengikuti tahun akademik dan gelombang, bukan filter
                    pendaftar.
                </p>
            </CardContent>
        </Card>
    );
}
function Reports({ data }: { data: Applicant[] }) {
    const summary = summarize(data);
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-base">Laporan Penerimaan</CardTitle>
                <CardDescription>
                    Rekap program studi berdasarkan seluruh filter aktif.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <caption className="sr-only">
                            Rekap pendaftaran per program studi
                        </caption>
                        <thead className="bg-secondary/50 text-xs text-muted-foreground">
                            <tr>
                                {[
                                    'Program studi',
                                    'Pendaftar',
                                    'Lunas',
                                    'Terverifikasi',
                                    'Daftar ulang',
                                ].map((h) => (
                                    <th key={h} className="p-3 font-medium">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {summary.demand.map((p) => {
                                const subset = data.filter(
                                    (a) => a.program === p.name,
                                );
                                return (
                                    <tr key={p.name} className="border-b">
                                        <td className="min-w-52 p-3 font-medium">
                                            {p.name}
                                        </td>
                                        <td className="p-3 tabular-nums">
                                            {p.count}
                                        </td>
                                        <td className="p-3 tabular-nums">
                                            {
                                                subset.filter(
                                                    (a) => a.payment === 'paid',
                                                ).length
                                            }
                                        </td>
                                        <td className="p-3 tabular-nums">
                                            {
                                                subset.filter(
                                                    (a) =>
                                                        a.documents ===
                                                        'verified',
                                                ).length
                                            }
                                        </td>
                                        <td className="p-3 tabular-nums">
                                            {
                                                subset.filter((a) => a.enrolled)
                                                    .length
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                    Ekspor laporan melalui tombol Unduh Laporan. Angka lunas
                    tidak memasukkan peserta bebas biaya.
                </p>
            </CardContent>
        </Card>
    );
}
function Notifications({
    data,
    filters,
}: {
    data: Applicant[];
    filters: Filters;
}) {
    const [read, setRead] = useState<string[]>([]);
    const summary = summarize(data);
    const notices = [
        {
            id: 'documents',
            title: `${number(summary.pending)} pendaftar menunggu verifikasi`,
            description:
                'Berkas telah diterima dan pembayaran telah dipenuhi. Tinjau melalui tab Ringkasan.',
            count: summary.pending,
        },
        {
            id: 'incomplete',
            title: `${number(data.filter((a) => a.documents === 'incomplete').length)} berkas belum lengkap`,
            description:
                'Calon mahasiswa masih perlu melengkapi dokumen pendaftaran.',
            count: data.filter((a) => a.documents === 'incomplete').length,
        },
        {
            id: 'payment',
            title: `${number(data.filter((a) => a.payment === 'pending' || a.payment === 'failed').length)} pembayaran perlu tindak lanjut`,
            description: 'Pembayaran menunggu, gagal, atau telah kedaluwarsa.',
            count: data.filter(
                (a) => a.payment === 'pending' || a.payment === 'failed',
            ).length,
        },
    ].filter((n) => n.count > 0);
    return (
        <div className="grid gap-5 lg:grid-cols-12">
            <Card className="shadow-none lg:col-span-8">
                <CardHeader className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <CardTitle className="text-base">
                            Pusat Notifikasi
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Pengingat administrasi dari data terpilih.
                        </CardDescription>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={notices.every((n) => read.includes(n.id))}
                        onClick={() => setRead(notices.map((n) => n.id))}
                    >
                        <CheckCheck className="mr-2 size-4" />
                        Tandai semua dibaca
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {notices.map((n) => (
                        <article
                            key={n.id}
                            className={`flex gap-3 rounded-lg border p-4 ${read.includes(n.id) ? '' : 'bg-secondary/40'}`}
                        >
                            <Bell className="mt-1 size-4 shrink-0 text-primary" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold">
                                    {n.title}
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {n.description}
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 h-7 px-0 text-xs"
                                    onClick={() =>
                                        setRead((old) =>
                                            old.includes(n.id)
                                                ? old.filter(
                                                      (id) => id !== n.id,
                                                  )
                                                : [...old, n.id],
                                        )
                                    }
                                >
                                    {read.includes(n.id)
                                        ? 'Tandai belum dibaca'
                                        : 'Tandai dibaca'}
                                </Button>
                            </div>
                            {!read.includes(n.id) && (
                                <span
                                    className="mt-2 size-2 rounded-full bg-primary"
                                    aria-label="Belum dibaca"
                                />
                            )}
                        </article>
                    ))}
                    {!notices.length && (
                        <p className="py-12 text-center text-sm text-muted-foreground">
                            Tidak ada notifikasi untuk filter ini.
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        Status baca hanya berlaku selama halaman ini terbuka.
                    </p>
                </CardContent>
            </Card>
            <div className="lg:col-span-4">
                <Agenda filters={filters} />
            </div>
        </div>
    );
}
export function Dashboard() {
    return (
        <DashboardBoundary>
            <AdmissionDashboard />
        </DashboardBoundary>
    );
}
function AdmissionDashboard() {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [period, setPeriod] = useState('30');
    const data = useMemo(
        () => filterApplicants(applicants, filters),
        [filters],
    );
    const summary = useMemo(() => summarize(data), [data]);
    const update = (key: keyof Filters, value: string) =>
        setFilters((old) => ({ ...old, [key]: value }));
    const invalidDates =
        !filters.from || !filters.to || filters.from > filters.to;
    const length =
        Math.round(
            (new Date(`${filters.to}T12:00:00Z`).getTime() -
                new Date(`${filters.from}T12:00:00Z`).getTime()) /
                86400000,
        ) + 1;
    const previous = invalidDates
        ? []
        : filterApplicants(applicants, {
              ...filters,
              from: shiftDate(filters.from, -length),
              to: shiftDate(filters.from, -1),
          });
    const change = (current: number, before: number) =>
        before ? Math.round(((current - before) / before) * 100) : null;
    const recentStart = [filters.from, shiftDate(filters.to || DEMO_DATE, -6)]
        .sort()
        .at(-1)!;
    const recent = data.filter((a) => a.date >= recentStart).length;
    const priorRecent = invalidDates
        ? []
        : filterApplicants(applicants, {
              ...filters,
              from: shiftDate(recentStart, -7),
              to: shiftDate(recentStart, -1),
          });
    const trendDays = invalidDates ? 7 : Math.min(Number(period), length);
    const reset = () => setFilters({ ...initialFilters });
    const exportReport = () =>
        downloadCsv(
            `laporan-pmb-${filters.year.replace('/', '-')}.csv`,
            summary.demand.map((p) => ({
                'Program Studi': p.name,
                Pendaftar: p.count,
                Lunas: data.filter(
                    (a) => a.program === p.name && a.payment === 'paid',
                ).length,
                'Tahun Akademik': filters.year,
                'Tanggal Mulai': filters.from,
                'Tanggal Akhir': filters.to,
                'Data Simulasi': true,
            })),
        );
    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </Header>
            <Main className="min-w-0 space-y-6 [--payment-failed:#b64e72] dark:[--payment-failed:#c85c78]">
                <section className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge
                                variant="outline"
                                className="gap-1.5 bg-card text-[11px]"
                            >
                                <CalendarDays className="size-3" />
                                TA {filters.year}
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="gap-1 text-[11px]"
                            >
                                <CheckCircle2 className="size-3" />
                                {filters.year === '2026/2027'
                                    ? 'Penerimaan dibuka'
                                    : 'Arsip penerimaan'}
                            </Badge>
                        </div>
                        <h1 className="font-manrope text-2xl font-bold tracking-tight sm:text-3xl">
                            Dashboard PMB
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            Ringkasan aktivitas dan perkembangan penerimaan
                            mahasiswa baru Universitas KH. Abdul Chalim.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="bg-card"
                        onClick={exportReport}
                        disabled={!data.length || invalidDates}
                    >
                        <Download className="mr-2 size-4" />
                        Unduh Laporan
                    </Button>
                </section>
                <section
                    aria-label="Filter dashboard"
                    className="rounded-xl border bg-card p-4"
                >
                    <div className="mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                            <SlidersHorizontal className="size-3.5" />
                            Filter pendaftaran
                        </span>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-muted-foreground"
                            onClick={reset}
                        >
                            <RotateCcw className="mr-1.5 size-3" />
                            Reset filter
                        </Button>
                    </div>
                    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-6">
                        <FilterSelect
                            label="Tahun akademik"
                            value={filters.year}
                            onChange={(v) => update('year', v)}
                            options={['2026/2027', '2025/2026'].map((v) => ({
                                value: v,
                                label: v,
                            }))}
                        />
                        <FilterSelect
                            label="Gelombang"
                            value={filters.wave}
                            onChange={(v) => update('wave', v)}
                            options={[
                                { value: 'all', label: 'Semua gelombang' },
                                ...['1', '2', '3'].map((v) => ({
                                    value: v,
                                    label: `Gelombang ${v}`,
                                })),
                            ]}
                        />
                        <FilterSelect
                            label="Jalur masuk"
                            value={filters.path}
                            onChange={(v) => update('path', v)}
                            options={[
                                { value: 'all', label: 'Semua jalur' },
                                ...paths.map((v) => ({ value: v, label: v })),
                            ]}
                        />
                        <FilterSelect
                            label="Program studi"
                            value={filters.program}
                            onChange={(v) => update('program', v)}
                            options={[
                                { value: 'all', label: 'Semua program studi' },
                                ...programs.map((v) => ({
                                    value: v,
                                    label: v,
                                })),
                            ]}
                        />
                        <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
                            Dari tanggal
                            <Input
                                type="date"
                                className="mt-1.5 w-full bg-card text-xs text-foreground"
                                aria-label="Dari tanggal"
                                value={filters.from}
                                max={filters.to || DEMO_DATE}
                                onChange={(e) => update('from', e.target.value)}
                            />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-muted-foreground">
                            Sampai tanggal
                            <Input
                                type="date"
                                className="mt-1.5 w-full bg-card text-xs text-foreground"
                                aria-label="Sampai tanggal"
                                value={filters.to}
                                min={filters.from}
                                max={DEMO_DATE}
                                onChange={(e) => update('to', e.target.value)}
                            />
                        </label>
                    </div>
                    {invalidDates && (
                        <p
                            role="alert"
                            className="mt-3 text-xs text-destructive"
                        >
                            Lengkapi rentang tanggal. Tanggal akhir tidak boleh
                            mendahului tanggal awal.
                        </p>
                    )}
                </section>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <p>
                        Data simulasi, bukan statistik resmi UAC. Acuan demo:{' '}
                        {dateLabel(DEMO_DATE)}.
                    </p>
                    <p aria-live="polite">
                        {number(data.length)} pendaftar sesuai filter
                    </p>
                </div>
                <Tabs defaultValue="overview" className="min-w-0 gap-5">
                    <div className="max-w-full overflow-x-auto">
                        <TabsList className="h-10 w-max bg-secondary/70 p-1">
                            <TabsTrigger value="overview">
                                Ringkasan
                            </TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analitik
                            </TabsTrigger>
                            <TabsTrigger value="reports">Laporan</TabsTrigger>
                            <TabsTrigger value="notifications">
                                Notifikasi
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    {!data.length || invalidDates ? (
                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
                                <Users className="size-8 text-muted-foreground" />
                                <h2 className="font-semibold">
                                    Tidak ada data pendaftaran untuk filter yang
                                    dipilih.
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Coba gelombang, program studi, atau rentang
                                    tanggal lainnya.
                                </p>
                                <Button variant="outline" onClick={reset}>
                                    Reset filter
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <TabsContent
                                value="overview"
                                className="min-w-0 space-y-5"
                            >
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <StatCard
                                        title="Total Pendaftar"
                                        value={summary.total}
                                        icon={Users}
                                        change={change(
                                            summary.total,
                                            previous.length,
                                        )}
                                        detail={
                                            previous.length
                                                ? 'vs periode sebelumnya'
                                                : 'Perbandingan belum tersedia'
                                        }
                                    />
                                    <StatCard
                                        title="Pendaftar Baru"
                                        value={recent}
                                        icon={UserRoundPlus}
                                        change={change(
                                            recent,
                                            priorRecent.length,
                                        )}
                                        detail={`${dateLabel(recentStart)} – ${dateLabel(filters.to)}`}
                                    />
                                    <StatCard
                                        title="Menunggu Verifikasi"
                                        value={summary.pending}
                                        icon={FileClock}
                                        detail="Berkas siap diperiksa"
                                        warning
                                    />
                                    <StatCard
                                        title="Pembayaran Lunas"
                                        value={summary.paid}
                                        icon={Wallet}
                                        detail={`${percentage(summary.paid, summary.eligible)}% dari ${number(summary.eligible)} peserta wajib bayar`}
                                    />
                                </div>
                                <Suspense fallback={<LoadingCharts />}>
                                    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-12">
                                        <Card className="min-w-0 gap-5 shadow-none lg:col-span-8">
                                            <CardHeader className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <CardTitle className="text-base">
                                                        Tren Pendaftaran
                                                    </CardTitle>
                                                    <CardDescription className="mt-1.5 text-xs">
                                                        Perkembangan jumlah
                                                        pendaftar harian, bukan
                                                        kumulatif.
                                                    </CardDescription>
                                                </div>
                                                <div
                                                    className="flex gap-1 rounded-lg bg-secondary/70 p-1"
                                                    role="group"
                                                    aria-label="Periode tren"
                                                >
                                                    {['7', '30', '90'].map(
                                                        (p) => (
                                                            <Button
                                                                key={p}
                                                                size="sm"
                                                                variant={
                                                                    period === p
                                                                        ? 'outline'
                                                                        : 'ghost'
                                                                }
                                                                className="h-7 px-2 text-xs"
                                                                aria-pressed={
                                                                    period === p
                                                                }
                                                                onClick={() =>
                                                                    setPeriod(p)
                                                                }
                                                            >
                                                                {p} hari
                                                            </Button>
                                                        ),
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <Trend
                                                    data={dailyRegistrations(
                                                        data,
                                                        filters.to,
                                                        trendDays,
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>
                                        <div className="min-w-0 lg:col-span-4">
                                            <Funnel data={data} />
                                        </div>
                                        <div className="min-w-0 lg:col-span-6">
                                            <Demand data={summary.demand} />
                                        </div>
                                        <div className="min-w-0 lg:col-span-6">
                                            <Payments data={summary.payments} />
                                        </div>
                                    </div>
                                </Suspense>
                                <div className="grid min-w-0 gap-5 lg:grid-cols-12">
                                    <div className="min-w-0 lg:col-span-8">
                                        <ApplicantsTable data={data} />
                                    </div>
                                    <div className="min-w-0 lg:col-span-4">
                                        <Agenda filters={filters} />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="analytics"
                                className="min-w-0 space-y-5"
                            >
                                <div className="rounded-xl border bg-secondary/40 p-5">
                                    <h2 className="font-manrope text-lg font-bold">
                                        Kualitas konversi penerimaan
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {number(summary.funnel[4])} dari{' '}
                                        {number(summary.total)} pendaftar telah
                                        menyelesaikan daftar ulang (
                                        {percentage(
                                            summary.funnel[4],
                                            summary.total,
                                        )}
                                        %).
                                    </p>
                                </div>
                                <Suspense fallback={<LoadingCharts />}>
                                    <div className="grid min-w-0 gap-5 lg:grid-cols-12">
                                        <div className="min-w-0 lg:col-span-8">
                                            <Demand data={summary.demand} />
                                        </div>
                                        <div className="min-w-0 lg:col-span-4">
                                            <Funnel data={data} />
                                        </div>
                                        <div className="min-w-0 lg:col-span-6">
                                            <Payments data={summary.payments} />
                                        </div>
                                        <Card className="shadow-none lg:col-span-6">
                                            <CardHeader>
                                                <CardTitle className="text-base">
                                                    Distribusi Jalur Masuk
                                                </CardTitle>
                                                <CardDescription className="text-xs">
                                                    Komposisi pendaftar pada
                                                    setiap jalur.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {paths.map((path) => {
                                                    const count = data.filter(
                                                        (a) => a.path === path,
                                                    ).length;
                                                    return (
                                                        <div key={path}>
                                                            <div className="mb-2 flex justify-between text-sm">
                                                                <span>
                                                                    {path}
                                                                </span>
                                                                <span className="font-semibold tabular-nums">
                                                                    {number(
                                                                        count,
                                                                    )}{' '}
                                                                    <span className="text-xs font-normal text-muted-foreground">
                                                                        (
                                                                        {percentage(
                                                                            count,
                                                                            data.length,
                                                                        )}
                                                                        %)
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <progress
                                                                className="h-2 w-full overflow-hidden rounded-full accent-primary [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary"
                                                                aria-label={`Pendaftar jalur ${path}`}
                                                                max={
                                                                    data.length
                                                                }
                                                                value={count}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                <p className="text-xs text-muted-foreground">
                                                    Jalur beasiswa dibebaskan
                                                    dari biaya pendaftaran.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Suspense>
                            </TabsContent>
                            <TabsContent value="reports" className="min-w-0">
                                <Reports data={data} />
                            </TabsContent>
                            <TabsContent
                                value="notifications"
                                className="min-w-0"
                            >
                                <Notifications
                                    key={JSON.stringify(filters)}
                                    data={data}
                                    filters={filters}
                                />
                            </TabsContent>
                        </>
                    )}
                </Tabs>
                <footer className="border-t pt-4 text-[11px] text-muted-foreground">
                    PMB Universitas KH. Abdul Chalim · Prototipe frontend ·
                    Tahun akademik {filters.year}
                </footer>
            </Main>
        </>
    );
}
