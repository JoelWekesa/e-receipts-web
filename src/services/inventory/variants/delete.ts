import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Del {
    id: string
    inventoryId: string
    token: string
}

const deleteVariant = async ({ id, inventoryId, token }: Del) => {
    const response = await InventoryClient({
        token,
        id: inventoryId
    }).delete(`inventory/variant?id=${id}`).then((res) => res.data)

    return response
}


const useDeleteVariant = (successFn: () => void) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteVariant,
        onSuccess: async () => {

            await queryClient.invalidateQueries({ queryKey: ["inventory"] }),

                toast("Variant Deleted", {
                    icon: "✅",
                    description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                })

            successFn()
        }
    })
}

export default useDeleteVariant