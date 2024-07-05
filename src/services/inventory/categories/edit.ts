import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";


interface Category {
    name: string;
    id: string
    token: string;
    storeId: string;
}

export const editCategory = async ({ token, storeId, ...data }: Category) => {
    const response = await InventoryClient({ token, id: storeId }).patch('/category/update', data).then((res) => res.data);

    return response;
}

export const useEditCategory = (successFn: () => void) => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storeCategories"] })
            toast("Category Edited", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })

            successFn()
        }
    })
}