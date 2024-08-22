import InventoryClient from "@/config/axios-inventory"
import { ClientOrder } from "@/models/orders/order-client"

interface Props {
    token: string
    id: string
}


const getOrder = async ({ token, id }: Props) => {
    const response: ClientOrder = await InventoryClient({ token }).get(`/orders/order?id=${id}`).then(res => res.data)
    return response
}

export default getOrder