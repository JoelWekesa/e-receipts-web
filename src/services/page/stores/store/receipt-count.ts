import ApiClient from "@/config/axios"
import { Count } from "@/models/receipts/count"

interface Props {
    storeId: string
    period: string
    token: string
}
export const storeReceiptsCount = async ({ storeId, period, token }: Props) => {
    const response: Count = await ApiClient(token).get(`receipts/store/countall?period=${period}&storeId=${storeId}`).then(res => res.data)
    return response
}