import ApiClient from "@/config/axios"
import { Store } from "@/models/store"

export const userStores = async (token: string) => {
    const stores: Store[] = await ApiClient(token).get("stores/stores").then(res => res.data)
    return stores
}