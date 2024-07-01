import { Count } from "@/models/receipts/count";
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';
import { Period } from "./businessperiod";
import { useSession } from "next-auth/react";


interface initialCount {
    period: Period
    count: Count
}


const getCount = async ({ period, token }: { period: Period, token: string }) => {

    const count: Count = await ApiClient(token).get("receipts/countall?period=" + period).then(res => res.data)

    return count
}


const useCount = ({ period, count }: initialCount) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: ['count', period],
        queryFn: () => getCount({
            period,
            token: token || ''
        }),
        initialData: count,
        enabled: !!token
    })
}

export default useCount;