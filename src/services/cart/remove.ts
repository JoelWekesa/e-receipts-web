import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export enum RemoveFromCartEnum {
    REMOVE_FROM_CART = 'remove-from-cart'
}


export interface ServerCart {
    cartId: string;
    variantId: string;
}

const removeFromCart = async ({ cartId, variantId }: ServerCart) => {

    const response = await InventoryClient({ token: '' }).delete(`/cart?cartId=${cartId}&variantId=${variantId}`).then(res => res.data)

    return response
}

const useRemoveFromCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeFromCart,
        onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['cart'] })
        },

        mutationKey: [RemoveFromCartEnum.REMOVE_FROM_CART]

    })
}

export default useRemoveFromCart;