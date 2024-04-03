import { Store } from '@/models/store';
import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';

export interface StoreFetch {
    initialData: Store[];
}


export const userStores = async () => {
    const stores: Store[] = await ApiClient.get("stores/stores").then(res => res.data)
    return stores
}

const useUserStores = ({ initialData }: StoreFetch) => useQuery({
    queryKey: ['user-stores'],
    queryFn: userStores,
    initialData
})

export default useUserStores;