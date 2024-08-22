import InventoryClient from "@/config/axios-inventory"
import { ClientOrder } from "@/models/orders/order-client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Props {
    token: string
    id: string
}

interface OrderProps {
    id: string
    order: ClientOrder
}


export const getOrder = async ({ token, id }: Props) => {
    const response: ClientOrder = await InventoryClient({ token }).get(`orders/order?id=${id}`).then(res => res.data)

    return response
}

const useOrder = ({ id, order }: OrderProps) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['order', { id }],
        queryFn: () => getOrder({ token, id }),
        initialData: order
    })
}

export default useOrder