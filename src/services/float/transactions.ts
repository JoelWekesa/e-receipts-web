import { Transaction } from "@/models/floats/transactions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getStoreTransactions } from "../page/float/transactions";
interface Props {
    storeId: string;
    transactions: Transaction[]
}

const useTransactions = ({ storeId, transactions }: Props) => {
    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['transactions', { storeId }],
        queryFn: async () => await getStoreTransactions({ token, storeId }),
        initialData: transactions
    })
}

export default useTransactions