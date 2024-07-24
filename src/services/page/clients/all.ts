import ApiClient from "@/config/axios"
import { Client } from "@/models/clients/clients";

interface Props {
    token: string
}

export const allClients = async ({ token }: Props) => {
    const response: Client[] = await ApiClient(token).get(`clients`).then(res => res.data);
    return response
}