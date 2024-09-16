import InventoryClient from "@/config/axios-inventory";
import { StoreCash } from "@/models/floats/store";

interface Props {
    storeId: string;
    token: string;
}

export const getStoreCash = async ({ storeId, token }: Props) => {
    const response: StoreCash | null = await InventoryClient({ token }).get(`floats/cash/balance?storeId=${storeId}`).then((res) => res.data);

    return response;
}