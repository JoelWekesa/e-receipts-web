import ApiClient from "@/config/axios";
import { Count } from "@/models/receipts/count";
import { durations } from "@/utils/durations";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Period } from "./businessperiod";

export enum Counts {
    daily_count = 'daily-count',
    weekly_count = 'weekly-count',
    monthly_count = 'monthly-count',
    yearly_count = 'yearly-count',
    alltime_count = 'alltime-count'
}

const countPeriodUrls = durations.map(
    (duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/countall?period=' + duration
);

async function getData({ token, url }: { token: string; url: string }) {
    const response = await ApiClient(token)
        .get(url)
        .then((res) => res.data);

    return response;
}

export const useDailyReceiptCount = (initialData: Count) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [Counts.daily_count],
        queryFn: async () => await getData({ token: token || '', url: countPeriodUrls.find(url => url.includes(Period.day)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useWeeklyReceiptCount = (initialData: Count) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [Counts.weekly_count],
        queryFn: async () => await getData({ token: token || '', url: countPeriodUrls.find(url => url.includes(Period.week)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useMonthlyReceiptCount = (initialData: Count) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [Counts.monthly_count],
        queryFn: async () => await getData({ token: token || '', url: countPeriodUrls.find(url => url.includes(Period.month)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useYearlyReceiptCount = (initialData: Count) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [Counts.yearly_count],
        queryFn: async () => await getData({ token: token || '', url: countPeriodUrls.find(url => url.includes(Period.year)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useAllTimeReceiptCount = (initialData: Count) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [Counts.alltime_count],
        queryFn: async () => await getData({ token: token || '', url: countPeriodUrls.find(url => url.includes(Period.alltime)) || '' }),
        enabled: !!token,
        initialData
    })
}

