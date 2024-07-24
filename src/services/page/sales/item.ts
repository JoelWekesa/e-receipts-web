import ApiClient from "@/config/axios"
import { Receipt } from "@/models/receipts/receipt"

interface Props {
    id: string
    token: string
}


export const getSell = async ({ id, token }: Props) => {
    const response: Receipt = await ApiClient(token).get(`receipts/receipt?id=${id}`).then(res => res.data)
    return response
}