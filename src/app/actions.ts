"use server"
import { v4 as uuidv4 } from "uuid"

import { cookies } from "next/headers"

export const getOrGenCookie = async () => {
    const random = await uuidv4()

    let cartId: string



    const id = await (await cookies()).get('cartId')?.value

    if (!id) {
        (await cookies()).set({
            name: 'cartId',
            value: random,
        })

        cartId = random
    } else {
        cartId = id
    }

    return cartId
}

export const delCookies = async () => {
    await (await cookies()).delete('cartId')

    const cartId = uuidv4()
    await (await cookies()).set({
        name: 'cartId',
        value: cartId,
    })
}

export const genOrderCookie = async (orderId: string) => {
    await (await cookies()).delete('orderId')

    await (await cookies()).set({
        name: 'orderId',
        value: orderId
    })
}