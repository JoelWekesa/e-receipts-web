import { siteConfig } from '@/config/site';
import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
    mainNav: MainNavItem[]; 
    sidebarNav?: SidebarNavItem[];
}


const storeNav = ({ storeId }: { storeId: string }): DocsConfig => {
    return {
        mainNav: [
            {
                title: 'Dashboard',
                href: `/store/dashboard/${storeId}`,
            },
            {
                title: 'New Sale',
                href: `/receipts/create/${storeId}`,
            },
            {
                title: 'Clients',
                href: `/inventory/${storeId}`,
            },
            {
                title: 'Orders',
                href: `/orders/${storeId}`,
            },
            {
                title: 'Top Ups',
                href: `/store/float/${storeId}`,
            },

            {
                title: 'Approve Transactions',
                href: `/float/transactions/${storeId}`,
            },

            {
                title: 'Cash Statements',
                href: `/store/statements/cash/${storeId}`,
            },

            {
                title: 'Float Statements',
                href: `/store/statements/float/${storeId}`,
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

export default storeNav


