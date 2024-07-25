import InventoryClient from "@/config/axios-inventory";
import { Option } from "@/models/inventory/option";

export const getInventoryOptions = async ({ id, token }: { id: string; token: string }) => {
    const response: Option[] = await InventoryClient({
        token,
    })
        .get(`/inventory/options?inventoryId=${id}`)
        .then((res) => res.data);
    return response;
};
