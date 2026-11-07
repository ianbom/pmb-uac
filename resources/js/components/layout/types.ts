type Team = {
    name: string;
    logo: React.ElementType;
    plan: string;
};

type BaseNavItem = {
    title: string;
    badge?: string;
    icon?: React.ElementType;
    description?: string;
};

type NavLink = BaseNavItem & {
    url: string;
    items?: never;
    disabled?: false;
};

type NavDisabled = BaseNavItem & {
    disabled: true;
    url?: never;
    items?: never;
};

type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: string })[];
    url?: never;
    disabled?: false;
};

type NavItem = NavCollapsible | NavLink | NavDisabled;

type NavGroup = {
    title: string;
    items: NavItem[];
};

type SidebarData = {
    teams: Team[];
    navGroups: NavGroup[];
};

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
