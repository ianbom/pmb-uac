import {
    LayoutDashboard,
    Monitor,
    ListTodo,
    HelpCircle,
    Bell,
    Package,
    Palette,
    Settings,
    Wrench,
    UserCog,
    Users,
    MessagesSquare,
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
} from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
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
