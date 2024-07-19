import ApiClient from "@/config/axios"

interface Props {
    token: string
    period: string
}


export const periodSales = async ({ token, period }: Props) => {
    const response = await ApiClient(token).get(`receipts/stores?period=${period}`).then(res => res.data)

    return response
}