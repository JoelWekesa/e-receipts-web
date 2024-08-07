import InventoryClient from "@/config/axios-inventory";
import { CartItem } from "@/models/cart/cart";

interface Props {
    cartId: string;
}
const getCartItems = async ({ cartId }: Props) => {
    const response: CartItem[] = await InventoryClient({
        token: ''
    }).get(`/cart?cartId=${cartId}`).then(res => res.data);

    return response;
}

export default getCartItems;