import { useQuery } from "@tanstack/react-query"
import { getStorePeriodSales } from "../page/stores/store/period-sales"
import { useSession } from "next-auth/react"
import { Receipt } from "@/models/receipts/receipt";

interface Props {
    period: string;
    storeId: string;
    sales: Receipt[];
}

const useStorePeriodSales = ({ period, storeId, sales }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: [`sales-${period}-${storeId}`, { period, storeId, id: "store-period-sales" }],
        queryFn: async () => await getStorePeriodSales({
            token,
            storeId,
            period
        }),

        enabled: !!token && !!storeId,

        initialData: sales,
    })

}

export default useStorePeriodSales