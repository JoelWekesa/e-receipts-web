import InventoryClient from "@/config/axios-inventory";
import { FloatTopUp } from "@/models/floats/top-up";

interface Props {
    token: string
    floatId: string
}


export const getFloatTopUps = async ({ token, floatId }: Props) => {
    const response: FloatTopUp[] = await InventoryClient({ token }).get(`floats/store/top-ups?floatId=${floatId}`).then((res) => res.data);

    return response;
}