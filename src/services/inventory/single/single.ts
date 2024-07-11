import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getInventory = async ({ id, token }: { id: string; token: string }) => {
    const response: Inventory = await InventoryClient({
        token,
    })
        .get(`/inventory?id=${id}`)
        .then((res) => res.data);

    return response;
}

const useSingleInventory = ({ id, inventory }: { id: string, inventory: Inventory }) => {

    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['inventory', { id }],
        queryFn: () => getInventory({ id, token }),
        initialData: inventory,
    })
}

export default useSingleInventory