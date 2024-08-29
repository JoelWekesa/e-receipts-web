import InventoryClient from "@/config/axios-inventory";
import { Transaction } from "@/models/floats/transactions";

interface Props {
    transactionId: string;
    token: string;
}

export const getStoreTransaction = async ({ token, transactionId }: Props) => {
    const response: Transaction = await InventoryClient({ token }).get(`floats/transaction?transactionId=${transactionId}`).then(res => res.data);

    return response;
}