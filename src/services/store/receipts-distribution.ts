import { Count } from "@/models/receipts/count"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { storeReceiptsCount } from "../page/stores/store/receipt-count"

interface Props {
    count: Count
    storeId: string
    period: string
}

const useStoreReceiptsDistribution = ({ count, storeId, period }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['receipts', { storeId, period }],
        queryFn: async () =>
            await storeReceiptsCount({
                storeId,
                token,
                period

            }),
        enabled: !!token,
        initialData: count
    })
}

export default useStoreReceiptsDistribution