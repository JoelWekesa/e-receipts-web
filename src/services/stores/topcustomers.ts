import { TopCustomers } from "@/models/store";
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';

const allTopCustomers = async () => {
    const top: TopCustomers[] = await ApiClient.get("receipts/topcustomersvolume").then(res => res.data)

    return top
}


const useTopCustomers = ({ topCustomers }: { topCustomers: TopCustomers[] }) => useQuery({
    queryFn: allTopCustomers,
    queryKey: ['top-customers'],
    initialData: topCustomers
})

export default useTopCustomers