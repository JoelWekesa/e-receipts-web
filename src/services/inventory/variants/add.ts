import InventoryClient from "@/config/axios-inventory"
import { Variant } from "@/models/inventory/inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

type VariantProps = Omit<Variant, "id" | "createdAt" | "updatedAt" | 'variant_name'>

interface Add {
    data: VariantProps
    token: string
}

const addVariant = async ({ data, token }: Add) => {
    console.log(data);
    const response = await InventoryClient({
        token,
        id: data.inventoryId
    }).post('inventory/variant', data).then(res => res.data)

    return response
}

const useAddVariant = (successFn: () => void) => {

    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: addVariant,
        onSuccess: async () => {
            const invalidate = [
                queryClient.invalidateQueries({ queryKey: ["inventory"] }),
            ]
            await Promise.all(invalidate)
            toast("Variant Added", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })

            successFn()

        }
    })
}

export default useAddVariant