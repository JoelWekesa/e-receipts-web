"use server"
import { v4 as uuidv4 } from "uuid"

import { cookies } from "next/headers"

export const getOrGenCookie = async () => {
    let cartId: string
    const id = await cookies().get('cartId')?.value

    if (!id) {
        cartId = uuidv4()
        cookies().set({
            name: 'cartId',
            value: cartId,
        })
    } else {
        cartId = id
    }

    return cartId
}

export const delCookies = async () => {
    await cookies().delete('cartId')

    const cartId = uuidv4()
    await cookies().set({
        name: 'cartId',
        value: cartId,
    })
}