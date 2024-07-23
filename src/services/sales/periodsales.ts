import { Receipt } from "@/models/receipts/receipt";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customPeriodSales, periodSales } from "../page/sales/periodsales";

interface Props {
    period: string;
    sales: Receipt[];
}

interface CustomBusinessPeriod extends Props {
    startDate: string;
    endDate: string;
}


const usePeriodSales = ({ period, sales }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['receipts', { period, id: "period-sales" }],
        queryFn: async () => await periodSales({
            token,
            period
        }),

        enabled: !!token,

        initialData: sales,
    })

}

export default usePeriodSales


export const useCustomPeriodSales = ({ period, sales, startDate, endDate }: CustomBusinessPeriod) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['receipts', { period, id: 'business-period', startDate, endDate }],
        queryFn: () => customPeriodSales({
            period,
            token,
            startDate,
            endDate
        }),
        initialData: sales,
        enabled: !!token && !!startDate && !!endDate && !!period
    })
}