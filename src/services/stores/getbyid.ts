
import { Store } from '@/models/store';
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';

interface StoreGet {
    id: string;
    store: Store | null;
}

const getStoreById = async (id: string) => {
    const storeItem: Store = await ApiClient.get("stores/store?id=" + id).then(res => res.data)

    return storeItem
}


const useStoreById = ({ id, store }: StoreGet) => useQuery({
    queryKey: ['user-stores', { id }],
    queryFn: () => getStoreById(id),
    initialData: store,
    enabled: !!id
})

export default useStoreById;