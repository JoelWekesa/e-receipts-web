import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    transactionId: string;
    token: string;
    reason: string;
}

const rejectTransaction = async ({ token, ...rest }: Props) => {
    const response = await InventoryClient({ token }).post(`floats/transaction/reject`, rest).then(res => res.data);
    return response
}

const useRejectTransaction = () => {
    const queryClient = useQueryClient()

    const toInvalidate = [
        'transactions',
        'transaction',
        'storeFloat',
    ]


    return useMutation({
        mutationFn: rejectTransaction,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries(
                {
                    queryKey: [key]
                }
            )))
            toast("Transaction Rejected", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                position: 'top-right'
            })
        }
    })
}

export default useRejectTransaction