import ApiClient from "@/config/axios";
import { Count } from "@/models/receipts/count";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export enum Counts {
    daily_count = 'daily-count',
    weekly_count = 'weekly-count',
    monthly_count = 'monthly-count',
    yearly_count = 'yearly-count',
    alltime_count = 'alltime-count'
}



async function getData({ token, period }: { token: string; period: string }) {


    const response: Count = await ApiClient(token)
        .get(`receipts/countall?period=${period}`)
        .then((res) => res.data);

    return response;
}

interface Props {
    count: Count
    period: string
}

export const useReceiptsDistribution = ({ count: initialData, period }: Props) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['count', { period, id: 'count' }],
        queryFn: async () => await getData({ token, period }),
        enabled: !!token,
        initialData
    })
}


