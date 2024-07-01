import { Period } from "./businessperiod";
import ApiClient from '../../config/axios';
import { Totals } from "@/models/receipts/totals";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Total {
    period: Period
    totals: Totals
}



interface TotalsI {
    period: Period,
    token: string
}
const getTotals = async ({ period, token }: TotalsI) => {

    const totals: Totals = await ApiClient(token).get("receipts/periodtotals?period=" + period).then(res => res.data)

    return totals
}


const useTotals = ({ period, totals }: Total) => {

    const { data: session } = useSession({

        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: ['totals', period],
        queryFn: () => getTotals({ period, token: token || '' }),
        initialData: totals,
        enabled: !!token
    })
}

export default useTotals;