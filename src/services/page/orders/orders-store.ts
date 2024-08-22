import InventoryClient from "@/config/axios-inventory"
import { OrderStatus, StoreOrder } from "@/models/orders/orders-store"

interface Props {
    storeId: string
    status: OrderStatus
    token: string
}

const orderStores = async ({ token, ...rest }: Props) => {
    const response: StoreOrder[] = await InventoryClient({ token }).get(`/orders/store?${new URLSearchParams(rest).toString()}`).then(res => res.data)
    return response
}

export default orderStores