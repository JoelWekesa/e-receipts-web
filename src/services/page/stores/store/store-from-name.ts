import ApiClient from "@/config/axios";
import { Store } from "@/models/store";

interface Props {
    name: string;
}

export const storeFromName = async ({ name }: Props) => {
    const response: Store = await ApiClient('').get(`stores/store-from-name?name=${name}`).then(res => res.data);
    return response;
}