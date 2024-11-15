import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                "/clients/*",
                "/dashboard/*",
                "/inventory/*",
                "/myteams/*",
                "/orders/*",
                "/profile/*",
                "/receipts/*",
                "/settings/*",
                "/store/*",
                "/stores/*",
                "/teams/*"
            ]
        },
        sitemap: `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`
    }
}