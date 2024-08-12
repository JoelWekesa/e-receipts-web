import InventoryClient from "@/config/axios-inventory"
import { Shipping } from "@/models/shipping/shipping"

const getShipping = async ({ token }: { token: string }) => {
    const response: Shipping = await InventoryClient({
        token
    }).get('shipping').then(res => res.data)

    return response
}

export default getShipping