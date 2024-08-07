

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

export const cartAtom = atom<Cart>({
    cartId: '',
    cart: []
})

export const openCart = atom<boolean>(false)