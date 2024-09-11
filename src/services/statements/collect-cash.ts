import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Props {
    token: string
    storeId: string
    amount: string
}

const collectCash = async ({ token, ...data }: Props) => {
    const response = await InventoryClient({ token }).post(`floats/cash/collect`, data).then((res) => res.data)

    return response
}


const useCollectCash = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const toInvalidate = ['storeCash', 'cashTopUps', 'cash-statements']

    return useMutation({
        mutationFn: collectCash,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries({
                queryKey: [key]
            })))

            successFn()
        }
    })

}

export default useCollectCash