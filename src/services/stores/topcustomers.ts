import { TopCustomers } from "@/models/store";
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';
import { useSession } from "next-auth/react";

const allTopCustomers = async (token: string) => {
    const top: TopCustomers[] = await ApiClient(token).get("receipts/topcustomersvolume").then(res => res.data)

    return top
}


const useTopCustomers = ({ topCustomers }: { topCustomers: TopCustomers[] }) => {

    const { data: session } = useSession({
        required: true
    })


    return useQuery({
        queryFn: () => allTopCustomers(session?.accessToken || ''),
        queryKey: ['top-customers'],
        initialData: topCustomers
    })
}

export default useTopCustomers