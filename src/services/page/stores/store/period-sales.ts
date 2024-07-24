import ApiClient from "@/config/axios";
import { Receipt } from "@/models/receipts/receipt";

interface Props {
    period: string
    storeId: string
    token: string
}

interface CustomPeriodProps extends Props {
    startDate: string
    endDate: string
}

export const getStorePeriodSales = async ({ period, storeId, token }: Props) => {
    const response: Receipt[] = await ApiClient(token)
        .get(process.env.NEXT_PUBLIC_API_URL + `receipts/store?period=${period}&storeId=${storeId}`)
        .then((res) => res.data);

    return response;
}


export const getCustomStorePeriodSales = async ({ token, period, storeId, startDate, endDate }: CustomPeriodProps) => {

    if (token.length < 1) return []
    const response: Receipt[] = await ApiClient(token).get(`receipts/store?period=${period}&storeId=${storeId}&from=${startDate}&to=${endDate}`).then(res => {

        return res.data
    })



    return response
}

