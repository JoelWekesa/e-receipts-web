import { siteConfig } from '@/config/site';
import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
    mainNav: MainNavItem[];
    sidebarNav?: SidebarNavItem[];
}


const baseNav = (): DocsConfig => {
    return {
        mainNav: [
            {
                title: 'Dashboard',
                href: `/dashboard`,
            },

            {
                title: "Create Store",
                href: `/stores/add`,
            },

            {
                title: 'My Stores',
                href: `/stores/all`,
            },

            {
                title: 'Clients',
                href: `/clients`,
            },
            {
                title: 'My Teams',
                href: `/myteams`,
            },
            {
                title: 'Settings',
                href: `/settings`,
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

export default baseNav


