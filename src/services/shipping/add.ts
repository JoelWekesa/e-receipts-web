import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Props {
    firstName: string,
    lastName: string
    phone: string
    address: string
    city: string
    email?: string
}

interface ShippingProps {
    shipping: Props
    token: string
}

const addShipping = async ({ shipping, token }: ShippingProps) => {
    const response = await InventoryClient({ token }).post('shipping', shipping).then(res => res.data)
    return response
}

const useAddShipping = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addShipping,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ['shipping']
            })

            toast("Shipping details updated", {
                description: dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })
        }
    })
}

export default useAddShipping