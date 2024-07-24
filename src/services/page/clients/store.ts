import ApiClient from "@/config/axios";
import { Client } from "@/models/clients/clients";

interface Props {
    storeId: string;
    token: string
}

export const getStoreClients = async ({ storeId, token }: Props) => {
    const response: Client[] = await ApiClient(token).get(`clients/store?storeId=${storeId}`).then(res => res.data);

    return response;
}