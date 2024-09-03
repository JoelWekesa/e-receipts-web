import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";


interface Category {
    id: string
    token: string;
    storeId: string
}

export const deleteCategory = async ({ token, id, storeId }: Category) => {
    const response = await InventoryClient({ token, id: storeId }).delete(`category/delete?id=${id}`).then((res) => res.data);

    return response;
}

export const useDeleteCategory = (successFn: () => void) => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storeCategories"] })
            toast("Category Deleted", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()
        }
    })
}