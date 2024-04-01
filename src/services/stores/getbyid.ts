import { StoreDatum } from "@/models/store"
import ApiClient from '../../config/axios';
import { useQuery } from "@tanstack/react-query";

interface Store {
    id: string;
    store: StoreDatum | null;
}

const getStoreById = async (id: string) => {
    const storeItem: StoreDatum = await ApiClient.get("stores/store?id=" + id).then(res => res.data)

    return storeItem
}


const useStoreById = ({ id, store }: Store) => useQuery({
    queryKey: ['user-stores', { id }],
    queryFn: () => getStoreById(id),
    initialData: store,
    enabled: !!id
})

export default useStoreById;