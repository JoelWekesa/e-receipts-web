import ApiClient from "@/config/axios";
import { TopCustomers, TopStore } from "@/models/store";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";


export enum TopEnum {
    topstores = "topstores",
    topcustomers = "topcustomers"
}

const topUrls = [
    process.env.NEXT_PUBLIC_API_URL + 'receipts/topstores',
    process.env.NEXT_PUBLIC_API_URL + 'receipts/topcustomersvolume',
];

async function getData({ token, url }: { token: string; url: string }) {
    const response = await ApiClient(token)
        .get(url)
        .then((res) => res.data);

    return response;
}

export const useTopStores = (initialData: TopStore[]) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken


    return useQuery({
        queryKey: ["top", { id: TopEnum.topstores }],
        queryFn: async () => await getData({ token: token || '', url: topUrls[0] || '' }),
        enabled: !!token,
        initialData
    })
}

export const useTopCustomers = (initialData: TopCustomers[]) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken


    return useQuery({
        queryKey: ["top", { id: TopEnum.topcustomers }],
        queryFn: async () => await getData({ token: token || '', url: topUrls[1] || '' }),
        enabled: !!token,
        initialData
    })
}