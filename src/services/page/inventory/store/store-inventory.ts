import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";

export const getStoreInventory = async ({ storeId, token }: { storeId: string; token: string }) => {
    const response: Inventory[] = await InventoryClient({ token })
        .get(`inventory/store?storeId=${storeId}`)
        .then((res) => res.data);
    return response;
};