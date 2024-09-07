
import InventoryClient from "@/config/axios-inventory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"



export interface ProductProps {
    name: string
    description: string
    storeId: string
    categoryId: string
    files: File[]
    thumbnail: File
    price: string
    discount: string
    quantity: string
}

export interface AddProduct {
    data: ProductProps
    token: string
}

const addProduct = async ({ data, token }: AddProduct) => {

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('storeId', data.storeId);
    formData.append('categoryId', data.categoryId);
    formData.append('thumbnail', data.thumbnail);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    formData.append('quantity', data.quantity);
    for (let i = 0; i < data.files.length; i++) {
        formData.append('files', data.files[i]);
    }

    const response = await InventoryClient({ token, id: data.storeId })
        .post('/inventory/single', formData)
        .then((res) => res.data);
    return response;
}

const useAddSimpleProduct = (successFn: () => void) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addProduct,
        onSuccess: async () => {
            const invalidate = [
                queryClient.invalidateQueries({ queryKey: ["inventory"] }),
            ]


            await Promise.all(invalidate)

            toast("Product Added", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()
        }
    })
}

export default useAddSimpleProduct