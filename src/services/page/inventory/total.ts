import InventoryClient from "@/config/axios-inventory";
import { Total } from "@/models/inventory/total";

export const getInventoryTotal = async ({ id, token }: { id: string; token: string }) => {
    const response: Total = await InventoryClient({
        token,
    })
        .get(`inventory/value?id=${id}`)
        .then((res) => res.data);
    return response;
};