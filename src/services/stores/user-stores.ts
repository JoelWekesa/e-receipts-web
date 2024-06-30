import { Store } from '@/models/store';
import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';

export interface StoreFetch {
    initialData: Store[];
    token: string;
}




export const userStores = async (token: string) => {
    const stores: Store[] = await ApiClient(token).get("stores/stores").then(res => res.data)
    return stores
}

const useUserStores = ({ initialData, token }: StoreFetch) => useQuery({
    queryKey: ['user-stores'],
    queryFn: () => userStores(token),
    initialData
})

export default useUserStores;