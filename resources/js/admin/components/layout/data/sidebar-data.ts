import {
    Construction,
    LayoutDashboard,
    Monitor,
    Bug,
    ListTodo,
    FileX,
    HelpCircle,
    Lock,
    Bell,
    Package,
    Palette,
    ServerOff,
    Settings,
    Wrench,
    UserCog,
    UserX,
    Users,
    MessagesSquare,
    ShieldCheck,
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
} from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
    user: {
        name: 'satnaing',
        email: 'satnaingdev@gmail.com',
        avatar: '/admin/images/favicon.png',
    },
    teams: [
        {
            name: 'Shadcn Admin',
            logo: Command,
            plan: 'Vite + ShadcnUI',
        },
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
    ],
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutDashboard,
                },
                {
                    title: 'Tasks',
                    url: '/tasks',
                    icon: ListTodo,
                },
                {
                    title: 'Apps',
                    url: '/apps',
                    icon: Package,
                },
                {
                    title: 'Chats',
                    url: '/chats',
                    badge: '3',
                    icon: MessagesSquare,
                },
                {
                    title: 'Users',
                    url: '/users',
                    icon: Users,
                },
            ],
        },
        {
            title: 'Pages',
            items: [
                {
                    title: 'Auth',
                    icon: ShieldCheck,
                    items: [
                        {
                            title: 'Sign In',
                            url: '/demo/auth/sign-in',
                        },
                        {
                            title: 'Sign In (2 Col)',
                            url: '/demo/auth/sign-in-2',
                        },
                        {
                            title: 'Sign Up',
                            url: '/demo/auth/sign-up',
                        },
                        {
                            title: 'Forgot Password',
                            url: '/demo/auth/forgot-password',
                        },
                        {
                            title: 'OTP',
                            url: '/demo/auth/otp',
                        },
                    ],
                },
                {
                    title: 'Errors',
                    icon: Bug,
                    items: [
                        {
                            title: 'Unauthorized',
                            url: '/demo/errors/401',
                            icon: Lock,
                        },
                        {
                            title: 'Forbidden',
                            url: '/demo/errors/403',
                            icon: UserX,
                        },
                        {
                            title: 'Not Found',
                            url: '/demo/errors/404',
                            icon: FileX,
                        },
                        {
                            title: 'Internal Server Error',
                            url: '/demo/errors/500',
                            icon: ServerOff,
                        },
                        {
                            title: 'Maintenance Error',
                            url: '/demo/errors/503',
                            icon: Construction,
                        },
                    ],
                },
            ],
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: Settings,
                    items: [
                        {
                            title: 'Profile',
                            url: '/settings/profile',
                            icon: UserCog,
                        },
                        {
                            title: 'Security',
                            url: '/settings/security',
                            icon: Wrench,
                        },
                        {
                            title: 'Account',
                            url: '/settings/account',
                            icon: Wrench,
                        },
                        {
                            title: 'Appearance',
                            url: '/settings/appearance',
                            icon: Palette,
                        },
                        {
                            title: 'Notifications',
                            url: '/settings/notifications',
                            icon: Bell,
                        },
                        {
                            title: 'Display',
                            url: '/settings/display',
                            icon: Monitor,
                        },
                    ],
                },
                {
                    title: 'Help Center',
                    url: '/help-center',
                    icon: HelpCircle,
                },
            ],
        },
    ],
};
