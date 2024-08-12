import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Shipping {
    shippingId: string
    cartId: string
    storeId: string
}

interface Props {
    shipping: Shipping
    token: string
}



const createOrder = async ({ shipping, token }: Props) => {
    const response = await InventoryClient({ token }).post('orders/create', shipping).then(res => res.data)
    return response
}

const useCreateOrder = (successFn: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createOrder,
        onSuccess: async (data) => {

            successFn()

            const keys = ['orders', 'cart']

            await Promise.all(keys.map(key => queryClient.invalidateQueries({
                queryKey: [key]
            })))

            toast("Order successfully created", {
                description: dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅"
            })
        },

        onError: () => {
            toast("Error creating order", {
                icon: "❌"
            })
        }
    })
}

export default useCreateOrder