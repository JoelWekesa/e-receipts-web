import InventoryClient from "@/config/axios-inventory";
import { Option } from "@/models/inventory/option";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getInventoryOptions = async ({ inventoryId, token }: { inventoryId: string; token: string }) => {
    

    const response: Option[] = await InventoryClient({
        token,
    }).get(`inventory/options?inventoryId=${inventoryId}`).then((res) => res.data);
    return response;
}

const useInventoryOptions = ({ inventoryId, initialData }: { inventoryId: string, initialData: Option[] }) => {
    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || '';


    return useQuery({
        queryKey: ['inventory', { inventoryId, options: 'options' }],
        queryFn: () => getInventoryOptions({ inventoryId, token }),
        enabled: !!token && !!inventoryId,
        initialData
    })
}

export default useInventoryOptions