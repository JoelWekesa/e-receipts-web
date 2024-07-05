import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Category {
    name: string;
    storeId: string
    token: string;
}

export const addCategory = async ({ token, ...data }: Category) => {
    const response = await InventoryClient({ token, id: data.storeId }).post('/category/new', data).then((res) => res.data);

    return response;
}

export const useAddCategory = (
    successFn: () => void
) => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storeCategories"] })
            toast("Category Added", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })


            successFn()

        }
    })
}