import ApiClient from "@/config/axios"
import { Store } from "@/models/store"

interface Props {
    id: string
    token: string
}

export const getStore = async ({ id, token }: Props) => {
    const response: Store = await ApiClient(token).get(`stores/store?id=${id}`).then(res => res.data)
    return response
}