import ApiClient from "@/config/axios";
import { Receipt } from "@/models/receipts/receipt";

interface Props {
    period: string
    storeId: string
    token: string
}

export const getStorePeriodSales = async ({ period, storeId, token }: Props) => {
    const response: Receipt[] = await ApiClient(token)
        .get(process.env.NEXT_PUBLIC_API_URL + `receipts/store?period=${period}&storeId=${storeId}`)
        .then((res) => res.data);

    return response;
}

