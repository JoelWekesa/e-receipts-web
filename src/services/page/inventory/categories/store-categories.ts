import InventoryClient from "@/config/axios-inventory";
import { Category } from "@/models/inventory/category";

export const getCategories = async ({ storeId, token }: { storeId: string; token: string }) => {
    const response: Category[] = await InventoryClient({
        token,
    })
        .get(`category/all?storeId=${storeId}`)
        .then((res) => res.data);

    return response;
};