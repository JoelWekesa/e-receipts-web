import { MeiliSearch } from 'meilisearch'


const searchClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || '',
    apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY || '',
})

export default searchClient