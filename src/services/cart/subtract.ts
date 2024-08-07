import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export enum SubtractFromCartEnum {
    SUBTRACT_FROM_CART = 'subtract-from-cart'
}

export interface ServerCart {
    cartId: string;
    variantId: string;
}

const subtractFromCart = async (data: ServerCart) => {

    const response = await InventoryClient({ token: '' }).post('/cart/subtract', data).then(res => res.data)

    return response
}

const useSubtractFromCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: subtractFromCart,
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['cart'] })
        },

        mutationKey: [SubtractFromCartEnum.SUBTRACT_FROM_CART]

    })
}

export default useSubtractFromCart;