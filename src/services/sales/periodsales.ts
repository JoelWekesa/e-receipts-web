import { Receipt } from "@/models/receipts/receipt";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { periodSales } from "../page/sales/periodsales";

interface Props {
    period: string;
    sales: Receipt[];
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