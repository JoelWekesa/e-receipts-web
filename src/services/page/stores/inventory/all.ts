import InventoryClient from "@/config/axios-inventory";
import { Total } from "@/models/inventory/total";

const getTotals = async ({ token }: { token: string }) => {
    const res: Total = await InventoryClient({
        token,
    })
        .get('inventory/all/value')
        .then((res) => res.data)
        .catch((err) => {
            throw new Error(err);
        });

    return res;
};

export default getTotals;