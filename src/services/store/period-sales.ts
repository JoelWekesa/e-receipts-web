import { Receipt } from "@/models/receipts/receipt";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCustomStorePeriodSales, getStorePeriodSales } from "../page/stores/store/period-sales";

interface Props {
    period: string;
    storeId: string;
    sales: Receipt[];
}

interface CustomPeriodProps extends Props {
    startDate: string
    endDate: string
}

const useStorePeriodSales = ({ period, storeId, sales }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['receipts', { period, storeId, id: "store-period-sales" }],
        queryFn: async () => await getStorePeriodSales({
            token,
            storeId,
            period
        }),

        enabled: !!token && !!storeId,

        initialData: sales,
    })

}


export const useStoreCustomPeriodSales = ({ period, storeId, sales, startDate, endDate }: CustomPeriodProps) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['receipts', { period, storeId, startDate, endDate, id: "store-period-sales" }],
        queryFn: async () => await getCustomStorePeriodSales({
            token,
            storeId,
            period,
            startDate,
            endDate
        }),

        enabled: !!token && !!storeId,

        initialData: sales,
    })
}

export default useStorePeriodSales