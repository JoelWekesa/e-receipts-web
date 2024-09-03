import { MVariant } from "@/components/inventory/edit-variant/form"
import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

export type CVar = Omit<MVariant, 'variant_name' | 'createdAt' | 'updatedAt'>

interface Var {
    variant: CVar
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
            ]
            await Promise.all(invalidate)
            toast("Variant Updated", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })
        }
    })
}

export default useUpdateVariant