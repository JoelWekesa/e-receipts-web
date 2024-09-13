import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    floatId: string;
    token: string;
    evidence: File;
    amount: string
}


const recordTransaction = async ({ token, floatId, evidence, amount }: Props) => {

    const formData = new FormData()

    formData.append('evidence', evidence)
    formData.append('floatId', floatId)
    formData.append('amount', amount)

    const response = await InventoryClient({ token }).post('floats/transaction', formData).then(res => res.data)

    return response

}

const useRecordTransaction = (successFn: () => void) => {

    const queryClient = useQueryClient()

    const toInvalidate = [
        'storeFloat',
        'floatTopUps',
        'transaction',
        'transactions',
        'float-statements'
    ]

    return useMutation({
        mutationFn: recordTransaction,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries(
                {
                    queryKey: [key]
                }
            )))

            successFn()

            toast.success("Transaction Recorded", {
                icon: "✅",
                position: 'top-right'
            })
        }
    })
}

export default useRecordTransaction;