import InventoryClient from "@/config/axios-inventory"
import { StoreFloat } from "@/models/floats/store"

interface Props {
    token: string
    storeId: string
}

export const getStoreFloat = async ({ token, storeId }: Props) => {
    const response: StoreFloat | null = await InventoryClient({ token }).get(`floats/store?storeId=${storeId}`).then(res => res.data)

    return response
}