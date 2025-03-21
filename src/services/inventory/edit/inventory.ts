import { Option } from "@/atoms/inventory/options";
import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Edit {
    name: string;
    description: string;
    images: File[];
    category: string;
    removed: string[];
    id: string
    options: Option[]
    thumbnail: File | string | null
    price?: string
}


const editInventory = async ({ data, token }: { data: Edit; token: string }) => {

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('categoryId', data.category);
    formData.append('id', data.id);
    data.images.forEach((image) => {
        formData.append('files', image);
    });

    if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
    }

    if (data.price) {
        formData.append('price', data.price);
    }

    formData.append('remove_images', JSON.stringify(data.removed));
    formData.append('options', JSON.stringify(data.options));

    const response = await InventoryClient({
        token,
        id: data.id,
    }).patch('inventory', formData).then((res) => res.data);

    return response;
}

const useEditInventory = () => {

    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: editInventory,

        onSuccess: async () => {
            const invalidate = [
                queryClient.invalidateQueries({ queryKey: ["inventory"] }),
            ]


            await Promise.all(invalidate)
            toast("Inventory Updated", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

        }
    })
}

export default useEditInventory