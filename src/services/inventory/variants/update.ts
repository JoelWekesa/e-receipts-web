import InventoryClient from "@/config/axios-inventory"
import { Variant } from "@/models/inventory/inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Var {
    variant: Variant
    token: string
}

const updateVariant = async ({ token, variant }: Var) => {
    const response = await InventoryClient({
        token,
        id: variant.inventoryId
    }).patch('inventory/variant', variant).then(res => res.data)

    return response
}

const useUpdateVariant = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateVariant,
        onSuccess: async () => {
            const invalidate = [
                queryClient.invalidateQueries({ queryKey: ["inventory"] }),
                queryClient.invalidateQueries({ queryKey: ["variant"] }),
                queryClient.invalidateQueries({ queryKey: ["inventoryOptions"] }),
                queryClient.invalidateQueries({ queryKey: ["inventory-variants"] })
            ]
            await Promise.all(invalidate)
            toast("Variant Updated", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })


        }
    })
}

export default useUpdateVariant