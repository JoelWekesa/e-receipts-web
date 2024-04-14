import { Period } from "./businessperiod";
import ApiClient from '../../config/axios';
import { Totals } from "@/models/receipts/totals";
import { useQuery } from "@tanstack/react-query";

interface Total {
    period: Period
    totals: Totals
}
const getTotals = async (period: Period) => {

    const totals: Totals = await ApiClient.get("receipts/periodtotals?period=" + period).then(res => res.data)

    return totals
}


const useTotals = ({ period, totals }: Total) => {
    return useQuery({
        queryKey: ['totals', period],
        queryFn: () => getTotals(period),
        initialData: totals
    })
}

export default useTotals;