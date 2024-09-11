import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Props {
    token: string
    id: string
    amount: string
}

const topUpCash = async ({ token, ...data }: Props) => {
    const response = await InventoryClient({ token }).post('floats/cash/top-up', data).then(res => res.data)

    return response
}


const useCashTopUp = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const toInvalidate = ['storeCash', 'cashTopUps', 'cash-statements']

    return useMutation({
        mutationFn: topUpCash,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries({
                queryKey: [key]
            })))

            successFn()
        }
    })
}

export default useCashTopUp