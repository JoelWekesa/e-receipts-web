import { useQuery } from "@tanstack/react-query"
import { getStorePeriodTotals } from "../page/stores/store/period-totals"
import { useSession } from "next-auth/react"
import { Totals } from "@/models/receipts/totals"
interface Props {
    period: string
    storeId: string
    totals: Totals
}

const useStorePeriodTotals = ({ period, storeId, totals }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['totals', { period, storeId }],
        queryFn: async () => await getStorePeriodTotals({
            period,
            storeId,
            token
        }),
        enabled: !!token,
        initialData: totals
    })
}

export default useStorePeriodTotals