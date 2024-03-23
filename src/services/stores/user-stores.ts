import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { Store } from '@/models/store';
const userStores = async (page: string) => {
    const stores: Store = await ApiClient.get("stores/stores?page=" + page + "&pageSize=10").then(res => res.data)
    return stores
}

const useUserStores = (page: string) => useQuery({
    queryKey: ['user-stores'],
    queryFn: () => userStores(page)
})

export default useUserStores;