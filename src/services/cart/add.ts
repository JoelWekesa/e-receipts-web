import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export enum AddToCartEnum {
    ADD_TO_CART = 'add-to-cart'
}

export interface ServerCart {
    cartId: string;
    variantId: string;
}

const addToCart = async (data: ServerCart) => {

    const response = await InventoryClient({ token: '' }).post('/cart', data).then(res => res.data)

    return response
}

const useAddToCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addToCart,

        onSuccess: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['cart'] })
        },

    })
}

export default useAddToCart;