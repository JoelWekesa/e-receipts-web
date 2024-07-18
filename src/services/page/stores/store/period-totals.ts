import ApiClient from "@/config/axios"
import { Totals } from "@/models/receipts/totals"

interface Props {
    period: string
    storeId: string
    token: string
}

export const getStorePeriodTotals = async ({ period, storeId, token }: Props) => {
    const response: Totals = await ApiClient(token).get(`receipts/store/period-totals?period=${period}&storeId=${storeId}`).then((res) => res.data)
    return response
}