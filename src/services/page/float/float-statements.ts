import InventoryClient from "@/config/axios-inventory";
import { FloatStatement } from "@/models/floats/float-statements";

interface Props {
    storeId: string;
    token: string;
}

const getStoreFloatStatements = async ({ storeId, token }: Props) => {
    const response: FloatStatement[] = await InventoryClient({ token }).get(`floats/statements?storeId=${storeId}`).then(res => res.data);
    return response;
}

export default getStoreFloatStatements;