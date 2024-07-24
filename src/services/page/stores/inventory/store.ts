import InventoryClient from "@/config/axios-inventory"
import { Total } from "@/models/inventory/total"

const getStoreInvValue = async ({ token, storeId }: { token: string, storeId: string }) => {

    const response: Total = await InventoryClient({
        token
    }).get(`inventory/store/value?storeId=${storeId}`).then(res => res.data)

    return response

}

export default getStoreInvValue