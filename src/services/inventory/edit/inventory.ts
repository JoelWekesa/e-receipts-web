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

    formData.append('remove_images', JSON.stringify(data.removed));

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
            await queryClient.invalidateQueries({ queryKey: ["inventory"] })
            toast("Inventory Updated", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })

        }
    })
}

export default useEditInventory