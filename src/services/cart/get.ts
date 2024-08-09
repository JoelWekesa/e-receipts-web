import { useQuery } from "@tanstack/react-query"
import getCartItems from "../page/cart/cookies";
import { CartItem } from "@/models/cart/cart";
interface Props {
    cartId: string;
    cartItems: CartItem[];
}

const useCartItems = ({ cartId, cartItems }: Props) => {
    return useQuery<CartItem[]>({
        queryKey: ['cart', { cartId }],
        queryFn: async () => getCartItems({ cartId }),
        initialData: cartItems,
    });
}

export default useCartItems;