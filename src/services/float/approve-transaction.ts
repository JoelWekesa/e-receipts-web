import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    transactionId: string;
    token: string;
}

const approveTransaction = async ({ transactionId, token }: Props) => {
    const response = await InventoryClient({ token }).post(`floats/transaction/approve`, { transactionId }).then(res => res.data);
    return response
}

const useApproveTransaction = () => {
    const queryClient = useQueryClient()

    const toInvalidate = [
        'transactions',
        'transaction',
        'storeFloat',
    ]


    return useMutation({
        mutationFn: approveTransaction,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries(
                {
                    queryKey: [key]
                }
            )))
            toast("Transaction Approved", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                position: 'top-right'
            })
        }
    })
}

export default useApproveTransaction