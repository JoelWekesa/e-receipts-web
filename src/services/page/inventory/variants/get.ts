import InventoryClient from "@/config/axios-inventory";
import { Variant } from "@/models/inventory/inventory";

export const getVariant = async ({ id, token }: { id: string; token: string }) => {
    const variant: Variant = await InventoryClient({
        token,
    })
        .get(`inventory/variant?id=${id}`)
        .then((res) => res.data);

    return variant;
};