import { useQuery } from "@tanstack/react-query"
import { getStoreFloat } from "../page/float/get-store-float"
import { StoreFloat } from "@/models/floats/store"
interface Props {
    token: string
    storeId: string
    storeFloat: StoreFloat | null
}

const useStoreFloat = ({ token, storeId, storeFloat }: Props) => {
    return useQuery({
        queryKey: ['storeFloat', { storeId, id: storeFloat?.id }],
        queryFn: async () => await getStoreFloat({ token, storeId }),
        initialData: storeFloat
    })
}

export default useStoreFloat