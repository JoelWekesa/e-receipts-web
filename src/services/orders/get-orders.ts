import { OrderStatus, StoreOrder } from "@/models/orders/orders-store"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import orderStores from "../page/orders/orders-store"

interface Props {
    orders: StoreOrder[]
    storeId: string
    status: OrderStatus
}

const useOrders = ({ storeId, status, orders: initialData }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['orders', {
            storeId,
            status
        }],

        queryFn: async () => orderStores({
            token,
            storeId,
            status
        }),

        initialData
    })
}

export default useOrders