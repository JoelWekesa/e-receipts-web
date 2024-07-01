import ApiClient from "@/config/axios";
import { Receipt } from "@/models/receipts/receipt";
import { durations } from "@/utils/durations";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Period } from "../receipts/businessperiod";

export enum PeriodSalesEnum {
    dailysales = "dailysales",
    weeklysales = "weeklysales",
    monthlysales = "monthlysales",
    yearlysales = "yearlysales",
    alltime = "alltime"
}

const receiptPeriodUrls = durations.map(
    (duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/store?period=' + duration
);

async function getData({ token: token, url }: { token: string; url: string }) {
    const response = await ApiClient(token)
        .get(url)
        .then((res) => res.data);

    return response;
}

export const useDailySales = (initialData: Receipt[]) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [PeriodSalesEnum.dailysales],
        queryFn: async () => await getData({ token: token || '', url: receiptPeriodUrls.find(url => url.includes(Period.day)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useWeeklySales = (initialData: Receipt[]) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [PeriodSalesEnum.weeklysales],
        queryFn: async () => await getData({ token: token || '', url: receiptPeriodUrls.find(url => url.includes(Period.week)) || '' }),
        enabled: !!token,
        initialData
    })
}

export const useMonthlySales = (initialData: Receipt[]) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [PeriodSalesEnum.monthlysales],
        queryFn: async () => await getData({ token: token || '', url: receiptPeriodUrls.find(url => url.includes(Period.month)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useYearlySales = (initialData: Receipt[]) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [PeriodSalesEnum.yearlysales],
        queryFn: async () => await getData({ token: token || '', url: receiptPeriodUrls.find(url => url.includes(Period.year)) || '' }),
        enabled: !!token,
        initialData
    })
}


export const useAllTimeSales = (initialData: Receipt[]) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({
        queryKey: [PeriodSalesEnum.alltime],
        queryFn: async () => await getData({ token: token || '', url: receiptPeriodUrls.find(url => url.includes(Period.alltime)) || '' }),
        enabled: !!token,
        initialData
    })
}