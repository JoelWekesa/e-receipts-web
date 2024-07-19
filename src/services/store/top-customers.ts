import { useQuery } from "@tanstack/react-query"
import { getStoreTopCustomers } from "../page/stores/store/top-customers"
import { useSession } from "next-auth/react"
import { TopCustomers } from "@/models/store"

const useStoreTopCustomers = ({ storeId, customers }: { storeId: string, customers: TopCustomers[] }) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['top', { id: 'topcustomers', storeId }],
        queryFn: async () =>
            await getStoreTopCustomers({
                storeId,
                token
            }),
        enabled: !!token,
        initialData: customers,
    })
}

export default useStoreTopCustomers