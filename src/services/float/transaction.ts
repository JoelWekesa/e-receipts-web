import { useQuery } from "@tanstack/react-query"
import { getStoreTransaction } from "../page/float/transaction"
import { useSession } from "next-auth/react"
import { Transaction } from "@/models/floats/transactions";
interface Props {
    transactionId: string;
    transaction: Transaction
}

const useTransaction = ({ transactionId, transaction }: Props) => {
    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['transaction', { transactionId }],
        queryFn: async () => await getStoreTransaction({ token, transactionId }),
        initialData: transaction
    })
}

export default useTransaction