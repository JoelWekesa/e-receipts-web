import InventoryClient from "@/config/axios-inventory";
import { Transaction } from "@/models/floats/transactions";

interface Props {
    storeId: string;
    token: string;
}

export const getStoreTransactions = async ({ token, storeId }: Props) => {
    const response: Transaction[] = await InventoryClient({ token }).get(`floats/transactions?storeId=${storeId}`).then(res => res.data);

    return response;
}