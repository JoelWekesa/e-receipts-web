import { Count } from "@/models/receipts/count";
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';
import { Period } from "./businessperiod";


interface initialCount {
    period: Period
    count: Count
}


const getCount = async (period: Period) => {

    const count: Count = await ApiClient.get("receipts/periodtotals?period=" + period).then(res => res.data)

    return count
}


const useCount = ({ period, count }: initialCount) => {
    return useQuery({
        queryKey: ['count', period],
        queryFn: () => getCount(period),
        initialData: count
    })
}

export default useCount;