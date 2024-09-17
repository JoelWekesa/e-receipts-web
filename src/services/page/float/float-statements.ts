import InventoryClient from "@/config/axios-inventory";
import { FloatStatement } from "@/models/floats/float-statements";

interface Props {
    storeId: string;
    token: string;
    startDate: string
    endDate: string
}

const getStoreFloatStatements = async ({ storeId, token, startDate, endDate }: Props) => {
    const response: FloatStatement[] = await InventoryClient({ token }).get(`floats/statements?storeId=${storeId}&startDate=${startDate}&endDate=${endDate}`).then(res => res.data);
    return response;
}

export default getStoreFloatStatements;