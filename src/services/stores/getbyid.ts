
import { Store } from '@/models/store';
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';
import { useSession } from 'next-auth/react';

interface StoreGet {
    id: string;
    store: Store | null;
}

const getStoreById = async ({ id, token }: { id: string, token: string }) => {
    const storeItem: Store = await ApiClient(token).get("stores/store?id=" + id).then(res => res.data)

    return storeItem
}


const useStoreById = ({ id, store }: StoreGet) => {
    const { data: session } = useSession()
    return useQuery({
        queryKey: ['user-stores', { id }],
        queryFn: () => getStoreById({
            id,
            token: session?.accessToken || ''
        }),
        initialData: store,
        enabled: !!id
    })
}

export default useStoreById;