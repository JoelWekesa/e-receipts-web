import InventoryClient from "@/config/axios-inventory";
import { VariantTypes } from "@/models/inventory/variant-types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getInventoryOptions = async ({ inventoryId, token }: { inventoryId: string; token: string }) => {

    const response: VariantTypes[] = await InventoryClient({
        token,
    }).get(`inventory/options?inventoryId=${inventoryId}`).then((res) => res.data);
    return response;
}

const useInventoryOptions = ({ inventoryId }: { inventoryId: string }) => {
    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || '';


    return useQuery({
        queryKey: ['inventoryOptions', inventoryId],
        queryFn: () => getInventoryOptions({ inventoryId, token }),
        enabled: !!token && !!inventoryId
    })
}

export default useInventoryOptions