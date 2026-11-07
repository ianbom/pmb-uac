import { useMemo, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Ellipsis,
    Search,
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dateLabel, number, status, type Applicant } from '../data';

export function StatusBadge({ value }: { value: string }) {
    return (
        <Badge
            variant="outline"
            className={
                value === 'Terverifikasi'
                    ? 'border-primary/20 bg-secondary text-secondary-foreground'
                    : value === 'Berkas Tidak Lengkap'
                      ? 'border-destructive/30 text-destructive'
                      : 'border-highlight/40 bg-highlight/15 text-foreground'
            }
        >
            {value}
        </Badge>
    );
}
export function ApplicantsTable({ data }: { data: Applicant[] }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('Tindakan');
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'date', desc: true },
    ]);
    const [selected, setSelected] = useState<{
        applicant: Applicant;
        documents: boolean;
    } | null>(null);
    const rows = useMemo(
        () =>
            data.filter(
                (a) =>
                    category === 'Semua' ||
                    (category === 'Tindakan'
                        ? status(a) !== 'Terverifikasi'
                        : status(a) === category),
            ),
        [data, category],
    );
    const columns: ColumnDef<Applicant>[] = [
        { accessorKey: 'registration', header: 'No. pendaftaran' },
        {
            accessorKey: 'name',
            header: 'Nama pendaftar',
            cell: ({ row }) => (
                <span className="font-medium">{row.original.name}</span>
            ),
        },
        { accessorKey: 'program', header: 'Program studi' },
        { accessorKey: 'path', header: 'Jalur' },
        {
            accessorKey: 'date',
            header: 'Tanggal',
            cell: ({ row }) => dateLabel(row.original.date),
        },
        {
            id: 'status',
            accessorFn: status,
            header: 'Status',
            cell: ({ row }) => <StatusBadge value={status(row.original)} />,
        },
        {
            id: 'actions',
            header: 'Aksi',
            enableSorting: false,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Aksi untuk ${row.original.name}`}
                        >
                            <Ellipsis className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                setSelected({
                                    applicant: row.original,
                                    documents: false,
                                })
                            }
                        >
                            Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                setSelected({
                                    applicant: row.original,
                                    documents: true,
                                })
                            }
                        >
                            Periksa Berkas
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    const table = useReactTable({
        data: rows,
        columns,
        state: { sorting, globalFilter: query },
        onSortingChange: setSorting,
        onGlobalFilterChange: setQuery,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 6 } },
    });
    const applicant = selected?.applicant;
    return (
        <>
            <Card className="min-w-0 gap-5 shadow-none">
                <CardHeader>
                    <CardTitle className="text-base">
                        Pendaftar Perlu Tindakan
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Tindak lanjut administrasi calon mahasiswa pada periode
                        terpilih.
                    </CardDescription>
                </CardHeader>
                <CardContent className="min-w-0 space-y-4">
                    <div className="relative">
                        <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
                        <Input
                            aria-label="Cari pendaftar"
                            placeholder="Cari nama, nomor pendaftaran, atau program studi..."
                            className="pl-9"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                table.setPageIndex(0);
                            }}
                        />
                    </div>
                    <div
                        className="flex flex-wrap gap-1.5"
                        role="group"
                        aria-label="Filter status pendaftar"
                    >
                        {[
                            'Tindakan',
                            'Menunggu Verifikasi',
                            'Berkas Tidak Lengkap',
                            'Belum Bayar',
                            'Terverifikasi',
                            'Semua',
                        ].map((value) => (
                            <Button
                                key={value}
                                size="sm"
                                variant={
                                    category === value ? 'secondary' : 'ghost'
                                }
                                aria-pressed={category === value}
                                className="h-8 text-xs"
                                onClick={() => {
                                    setCategory(value);
                                    table.setPageIndex(0);
                                }}
                            >
                                {value}
                            </Button>
                        ))}
                    </div>
                    <div className="min-w-0 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((group) => (
                                    <TableRow key={group.id}>
                                        {group.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="whitespace-nowrap"
                                            >
                                                {header.column.getCanSort() ? (
                                                    <button
                                                        className="inline-flex items-center gap-2 rounded py-2 focus-visible:ring-2 focus-visible:ring-ring"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        aria-label={`Urutkan ${String(header.column.columnDef.header)}`}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                        <ArrowUpDown className="size-3" />
                                                        <span className="sr-only">
                                                            {header.column.getIsSorted() ===
                                                            'desc'
                                                                ? 'menurun'
                                                                : header.column.getIsSorted() ===
                                                                    'asc'
                                                                  ? 'menaik'
                                                                  : 'belum diurutkan'}
                                                        </span>
                                                    </button>
                                                ) : (
                                                    flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="max-w-52 text-xs leading-relaxed whitespace-normal"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-32 text-center text-muted-foreground"
                                        >
                                            Tidak ada pendaftar yang cocok. Ubah
                                            pencarian atau status.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span>
                            {number(table.getFilteredRowModel().rows.length)}{' '}
                            pendaftar · Halaman{' '}
                            {table.getState().pagination.pageIndex + 1} dari{' '}
                            {Math.max(1, table.getPageCount())}
                        </span>
                        <div className="flex gap-1">
                            <Button
                                size="icon"
                                variant="outline"
                                aria-label="Halaman sebelumnya"
                                disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                            >
                                <ChevronLeft className="size-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                aria-label="Halaman berikutnya"
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.nextPage()}
                            >
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Sheet
                open={!!selected}
                onOpenChange={(open) => {
                    if (!open) setSelected(null);
                }}
            >
                <SheetContent className="w-full overflow-y-auto sm:max-w-md [&_[data-slot=sheet-header]]:pr-10">
                    <SheetHeader>
                        <SheetTitle>
                            {selected?.documents
                                ? 'Periksa Berkas'
                                : 'Detail Pendaftar'}
                        </SheetTitle>
                        <SheetDescription>
                            Data simulasi · Hanya baca, tanpa perubahan data.
                        </SheetDescription>
                    </SheetHeader>
                    {applicant && (
                        <div className="space-y-6 px-4 pb-6">
                            <div className="rounded-lg border bg-card p-4">
                                <p className="font-manrope text-lg font-bold">
                                    {applicant.name}
                                </p>
                                <p className="mt-1 mb-3 text-xs text-muted-foreground">
                                    {applicant.registration}
                                </p>
                                <StatusBadge value={status(applicant)} />
                            </div>
                            <dl className="space-y-4 text-sm">
                                {Object.entries({
                                    'Program studi': applicant.program,
                                    'Tahun akademik': applicant.year,
                                    Gelombang: applicant.wave,
                                    'Jalur masuk': applicant.path,
                                    'Tanggal daftar': dateLabel(applicant.date),
                                    Pembayaran: {
                                        paid: 'Lunas',
                                        pending: 'Menunggu Pembayaran',
                                        failed: 'Gagal / Kedaluwarsa',
                                        exempt: 'Bebas biaya (beasiswa)',
                                    }[applicant.payment],
                                    Seleksi: applicant.selected
                                        ? 'Lulus Seleksi'
                                        : 'Belum lulus / belum dinilai',
                                    'Daftar ulang': applicant.enrolled
                                        ? 'Selesai'
                                        : 'Belum selesai',
                                }).map(([label, value]) => (
                                    <div key={label}>
                                        <dt className="text-xs text-muted-foreground">
                                            {label}
                                        </dt>
                                        <dd className="mt-1 font-medium">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <section className="rounded-lg border p-4">
                                <h3 className="mb-3 font-semibold">
                                    Kelengkapan berkas
                                </h3>
                                <p className="text-sm">
                                    {applicant.documents === 'verified'
                                        ? 'Seluruh berkas terverifikasi.'
                                        : applicant.documents === 'incomplete'
                                          ? 'Ijazah / surat keterangan lulus belum dilengkapi.'
                                          : 'Berkas diterima, menunggu pemeriksaan petugas.'}
                                </p>
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Dokumen simulasi; berkas asli tidak tersedia
                                    pada prototipe ini.
                                </p>
                            </section>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
