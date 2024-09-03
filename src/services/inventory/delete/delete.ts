import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";



const deleteInventory = async ({ id, token }: { id: string; token: string }) => {
    const response = await InventoryClient({
        token,
        id
    }).delete(`inventory?id=${id}`).then((res) => res.data)

    return response
}

const useDeleteInventory = (successFn: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteInventory,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["inventory"] })
            toast("Inventory Deleted", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()
        }
    })
}

export default useDeleteInventory