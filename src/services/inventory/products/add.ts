
import { Variant } from "@/atoms/inventory/variants"
import InventoryClient from "@/config/axios-inventory"
import { useMutation } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

type VariantType = Omit<Variant, 'price' | 'quantity' | 'warnLevel'>

interface VariantProps extends VariantType {
    price: number
    quantity: number
    warnLevel: number
}

export interface ProductProps {
    name: string
    description?: string
    storeId: string
    categoryId: string
    files: File[]
    variants: VariantProps[]
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
    formData.append('variants', JSON.stringify(data.variants));
    for (let i = 0; i < data.files.length; i++) {
        formData.append('files', data.files[i]);
    }

    const response = await InventoryClient({ token, id: data.storeId })
        .post('/inventory', formData)
        .then((res) => res.data);
    return response;
}

const useAddProduct = () => {
    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            toast("Product Added", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })
        }
    })
}

export default useAddProduct