import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { Store } from '@/models/store';

export interface StoreFetch {
    page: string;
    initialData: Store;
}


export const userStores = async (page: string) => {
    const stores: Store = await ApiClient.get("stores/stores?page=" + page + "&pageSize=" + process.env.NEXT_PUBLIC_PER_PAGE).then(res => res.data)


    return stores
}

const useUserStores = ({ page, initialData }: StoreFetch) => useQuery({
    queryKey: ['user-stores', { page }],
    queryFn: () => userStores(page),
    initialData
})

export default useUserStores;