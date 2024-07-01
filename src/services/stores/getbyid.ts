
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

    const token = session?.accessToken
    return useQuery({
        queryKey: ['user-stores', { id }],

        queryFn: () => getStoreById({
            id,
            token: token || ''
        }),
        initialData: store,
        enabled: !!id && !!token
    })
}

export default useStoreById;