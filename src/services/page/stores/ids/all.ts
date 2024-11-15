import ApiClient from "@/config/axios"
import { StoreID } from "@/models/stores/ids"

export const getAllStoreIds = async () => {
    const all: StoreID[] = await ApiClient('').get('stores/ids').then(res => res.data)

    const ids = all.map(item => item.id)

    return ids
}