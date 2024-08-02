import InventoryClient from "@/config/axios-inventory";
import { Inventory } from "@/models/inventory/inventory";
import { Product } from "@/models/inventory/product";

export const getStoreProducts = async ({ token, storeId }: { token: string; storeId: string }) => {
    const products: Product[] = await InventoryClient({
        token,
    })
        .get(`inventory/store/variants?storeId=${storeId}`)
        .then((res) => res.data);

    return products;
};

export const getStoreProductStoreFront = async ({ name }: { name: string }) => {
    const response: Inventory[] = await InventoryClient({
        token: ''
    }).get(`inventory/store/store-front?name=${name}`).then(res => res.data);

    return response;
}