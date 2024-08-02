import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";

interface Props {
    store: string;
    name: string;
}
export const getStoreInventoryItem = async ({ store, name }: Props) => {
    const response: Inventory = await InventoryClient({ token: '' }).get(`inventory/item?store=${store}&name=${name}`).then(res => res.data);

    return response;
}