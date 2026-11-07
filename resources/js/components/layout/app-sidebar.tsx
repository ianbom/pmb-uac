import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { useLayout } from '@/context/layout-provider';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
// import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { GraduationCap } from 'lucide-react';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const { collapsible, variant } = useLayout();
    return (
        <Sidebar collapsible={collapsible} variant={variant}>
            <SidebarHeader>
                <div className="flex h-12 items-center gap-2 overflow-hidden px-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-highlight text-highlight-foreground">
                        <GraduationCap className="size-5" />
                    </div>
                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="truncate font-semibold">PMB UAC</p>
                        <p className="truncate text-xs">
                            Administrasi Penerimaan
                        </p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: auth.user.name,
                        email: auth.user.email,
                        avatar: '',
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
