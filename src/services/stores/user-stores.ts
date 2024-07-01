import { Store } from '@/models/store';
import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { useSession } from 'next-auth/react';

export interface StoreFetch {
    initialData: Store[];
    token: string;
}




export const userStores = async (token: string) => {
    const stores: Store[] = await ApiClient(token).get("stores/stores").then(res => res.data)
    return stores
}

const useUserStores = ({ initialData }: StoreFetch) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: ['user-stores'],
        queryFn: () => userStores(token || ''),
        initialData,
        enabled: !!token
    })
}

export default useUserStores;