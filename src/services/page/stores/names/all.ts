import ApiClient from "@/config/axios"
import { StoreName } from "@/models/stores/names"

export const getAllStoreNames = async () => {
    const all: StoreName[] = await ApiClient('').get('stores/names').then(res => res.data)

    const ids = all.map(item => item.name)

    return ids
}