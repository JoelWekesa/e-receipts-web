import { siteConfig } from '@/config/site';
import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
    mainNav: MainNavItem[];
    sidebarNav?: SidebarNavItem[];
}


const teamNav = ({ teamId }: { teamId: string }): DocsConfig => {
    return {
        mainNav: [
            {
                title: 'Dashboard',
                href: `/teams/dashboard/${teamId}`,
            },
            {
                title: 'New Sale',
                href: `/teams/receipt/create/${teamId}`,
            },
            {
                title: 'Clients',
                href: `/teams/clients/${teamId}`,
            },
            {
                title: 'Inventory',
                href: `/teams/inventory/${teamId}`,
            },
            {
                title: 'Orders',
                href: `/teams/orders/${teamId}`,
            },



            {
                title: 'Record Float Balance',
                href: `/teams/float/${teamId}`,
            },

            {
                title: 'Cash Statements',
                href: `/teams/statements/cash/${teamId}`,
            },

            {
                title: 'Float Statements',
                href: `/teams/statements/float/${teamId}`,
            },
            {
                title: 'GitHub',
                href: `${siteConfig.links.github}`,
                external: true,
            },
            {
                title: 'Twitter',
                href: `${siteConfig.links.twitter}`,
                external: true,
            },
        ],
    };
}

export default teamNav


