

import { Variant } from "@/models/inventory/inventory";
import { atom } from "jotai";


export interface CartVariant extends Variant {
    product_name: string
    items: number
    inventory?: {
        name: string
        thumbnail: string
    }
}

export interface Cart {
    cartId: string
    cart: CartVariant[]
}

export interface CartActions {
    loading: boolean
    variantId: string
}

export const cartAtom = atom<Cart>({
    cartId: '',
    cart: []
})

export const openCart = atom<boolean>(false)


export const cartActions = atom<CartActions>({
    loading: false,
    variantId: ''
})