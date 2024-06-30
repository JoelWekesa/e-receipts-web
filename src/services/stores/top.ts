import { TopStore } from "@/models/store"
import ApiClient from '../../config/axios';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const allTopStores = async (token: string) => {
    const top: TopStore[] = await ApiClient(token).get("receipts/topstores").then(res => res.data)

    return top
}


const useTopStores = ({ topStores }: { topStores: TopStore[] }) => {
    const { data: session } = useSession({
        required: true
    })
    return useQuery({
        queryFn: () => allTopStores(session?.accessToken || ''),
        queryKey: ['top-stores'],
        initialData: topStores
    })
}

export default useTopStores