import { StoreName } from '@/models/stores/names'
import axios from 'axios'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://estore.africa'

    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL


    const stores: StoreName[] = await axios.get(baseApiUrl + "stores/names").then(res => res.data)

    const storeEntries = stores.map(item => ({
        url: baseUrl + `/shop/${item.name}`,
        priority: 0.5
    }))

    return [
        {
            url: baseUrl,
            priority: 1,
        },
        {
            url: baseUrl + "/auth/register",
            priority: 0.8,
        },

        {
            url: baseUrl + "/auth/login",
            priority: 0.9,
        },
        ...storeEntries
    ]
}