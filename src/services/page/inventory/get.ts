import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";

export const getInventory = async ({ id, token }: { id: string; token: string }) => {
    const response: Inventory = await InventoryClient({
        token,
    })
        .get(`/inventory?id=${id}`)
        .then((res) => res.data);

    return response;
};
