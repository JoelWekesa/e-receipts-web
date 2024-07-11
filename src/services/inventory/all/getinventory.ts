import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";


interface Q {
    storeId: string
    inventory: Inventory[]
}

export const getInventory = async ({ storeId, token }: { storeId: string; token: string }) => {
    const response = await InventoryClient({ token })
        .get(`inventory/store?storeId=${storeId}`)
        .then((res) => res.data);
    return response;
};


const useInventory = ({ storeId, inventory }: Q) => {

    const { data: session } = useSession({
        required: true,
    })

    return useQuery({
        queryKey: ['inventory', { storeId }],
        queryFn: () => getInventory({ storeId, token: session?.accessToken || '' }),
        initialData: inventory
    })
}

export default useInventory