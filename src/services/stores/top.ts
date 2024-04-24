import { TopStore } from "@/models/store"
import ApiClient from '../../config/axios';
import { useQuery } from "@tanstack/react-query";

const allTopStores = async () => {
    const top: TopStore[] = await ApiClient.get("receipts/topstores").then(res => res.data)

    return top
}


const useTopStores = ({ topStores }: { topStores: TopStore[] }) => useQuery({
    queryFn: allTopStores,
    queryKey: ['top-stores'],
    initialData: topStores
})

export default useTopStores