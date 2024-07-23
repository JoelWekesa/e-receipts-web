import ApiClient from "@/config/axios"
import { Receipt } from "@/models/receipts/receipt"

interface Props {
    token: string
    period: string
}

interface CustomPeriodProps extends Props {
    startDate: string
    endDate: string
}


export const periodSales = async ({ token, period }: Props) => {
    const response: Receipt[] = await ApiClient(token).get(`receipts/stores?period=${period}`).then(res => res.data)

    return response
}


export const customPeriodSales = async ({ token, period, startDate, endDate }: CustomPeriodProps) => {
    if (token.length < 1) return []
    const response: Receipt[] = await ApiClient(token).get(`receipts/stores?period=${period}&from=${startDate}&to=${endDate}`).then(res => res.data)

    return response
}