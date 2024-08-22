import InventoryClient from "@/config/axios-inventory"
import { OrderStatus } from "@/models/orders/orders-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Props {
    token: string
    id: string
    status: OrderStatus
    cash: number
    mpesa: number
    mpesa_name?: string
    mpesa_transaction_id?: string
    mpesa_phone_no?: string
}
const processOrderDto = async ({ token, ...data }: Props) => {
    const response = await InventoryClient({ token }).post('orders/process', data).then(res => res.data)

    return response
}

const useProcessOrder = () => {

    const queryClient = useQueryClient()

    const toInvalidate = [
        'orders',
        'order'
    ]

    return useMutation({
        mutationFn: processOrderDto,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries({
                queryKey: [key]
            })))

            toast("Order Processed", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: 'top-right'
            })
        }
    })
}

export default useProcessOrder