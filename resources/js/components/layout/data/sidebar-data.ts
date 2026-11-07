import {
    LayoutDashboard,
    Users,
    CalendarRange,
    Route,
    FileCheck,
    ClipboardCheck,
    UserCheck,
    GraduationCap,
    CreditCard,
    Award,
    Megaphone,
    Bell,
    PanelsTopLeft,
    ChartNoAxesCombined,
    ShieldCheck,
    Settings,
    UserCog,
    LockKeyhole,
    Palette,
} from 'lucide-react';
import type { SidebarData } from '../types';

export const sidebarData: SidebarData = {
    teams: [
        {
            name: 'PMB UAC',
            logo: GraduationCap,
            plan: 'Administrasi Penerimaan',
        },
    ],
    navGroups: [
        {
            title: 'Utama',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            title: 'Peserta',
            items: [
                {
                    title: 'Data Pendaftar',
                    url: '/users',
                    icon: Users,
                    description:
                        'Melihat, mencari, memfilter, dan mengelola calon mahasiswa',
                },
                {
                    title: 'Verifikasi Berkas',
                    icon: FileCheck,
                    disabled: true,
                    description:
                        'Memeriksa KTP, ijazah, rapor, dan dokumen persyaratan',
                },
                {
                    title: 'Seleksi & Penilaian',
                    icon: ClipboardCheck,
                    disabled: true,
                    description:
                        'Mengatur jadwal, peserta, nilai, dan kelulusan seleksi',
                },
                {
                    title: 'Daftar Ulang',
                    icon: UserCheck,
                    disabled: true,
                    description:
                        'Memantau calon mahasiswa yang diterima dan proses registrasi ulang',
                },
            ],
        },
        {
            title: 'Pendaftaran',
            items: [
                {
                    title: 'Gelombang Pendaftaran',
                    icon: CalendarRange,
                    disabled: true,
                    description:
                        'Mengatur periode, tanggal buka/tutup, dan status pendaftaran',
                },
                {
                    title: 'Jalur Pendaftaran',
                    icon: Route,
                    disabled: true,
                    description:
                        'Mengatur jalur reguler, prestasi, beasiswa, dan jalur khusus',
                },
                {
                    title: 'Program Studi & Kuota',
                    icon: GraduationCap,
                    disabled: true,
                    description:
                        'Mengatur pilihan program studi serta kuota penerimaan',
                },
            ],
        },
        {
            title: 'Keuangan',
            items: [
                {
                    title: 'Pembayaran',
                    icon: CreditCard,
                    disabled: true,
                    description:
                        'Melihat transaksi, status pembayaran, dan rekonsiliasi',
                },
                {
                    title: 'Beasiswa',
                    icon: Award,
                    disabled: true,
                    description:
                        'Mengelola program, persyaratan, dan penerima beasiswa',
                },
            ],
        },
        {
            title: 'Informasi',
            items: [
                {
                    title: 'Pengumuman',
                    icon: Megaphone,
                    disabled: true,
                    description:
                        'Mengelola informasi yang ditampilkan kepada calon mahasiswa',
                },
                {
                    title: 'Notifikasi',
                    icon: Bell,
                    disabled: true,
                    description:
                        'Mengirim pengingat melalui email, WhatsApp, atau notifikasi sistem',
                },
                {
                    title: 'Konten Website',
                    icon: PanelsTopLeft,
                    disabled: true,
                    description:
                        'Mengatur banner, FAQ, brosur, dan konten portal PMB',
                },
            ],
        },
        {
            title: 'Laporan',
            items: [
                {
                    title: 'Laporan & Statistik',
                    icon: ChartNoAxesCombined,
                    disabled: true,
                    description:
                        'Analisis pendaftaran, grafik, dan ekspor Excel/PDF',
                },
            ],
        },
        {
            title: 'Pengaturan',
            items: [
                {
                    title: 'Manajemen Admin',
                    icon: ShieldCheck,
                    disabled: true,
                    description: 'Mengelola akun, peran, dan hak akses panitia',
                },
                {
                    title: 'Pengaturan',
                    icon: Settings,
                    items: [
                        {
                            title: 'Profil Akun',
                            url: '/settings/profile',
                            icon: UserCog,
                        },
                        {
                            title: 'Keamanan',
                            url: '/settings/security',
                            icon: LockKeyhole,
                        },
                        {
                            title: 'Tampilan',
                            url: '/settings/appearance',
                            icon: Palette,
                        },
                    ],
                },
            ],
        },
    ],
};
