import InventoryClient from "@/config/axios-inventory"
import { Category } from "@/models/inventory/category"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"


interface Cat {
    storeId: string
    categories: Category[]
}


export const getCategories = async ({ storeId, token }: { storeId: string; token: string }) => {
    const response = await InventoryClient({
        token
    })
        .get(`category/all?storeId=${storeId}`)
        .then((res) => res.data);

    return response;
};
const useStoreCategories = ({ storeId, categories }: Cat) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''
    return useQuery({
        queryKey: ["storeCategories", storeId],
        queryFn: () => getCategories({ storeId, token }),
        initialData: categories,
    })
}

export default useStoreCategories