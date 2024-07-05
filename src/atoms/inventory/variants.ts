import { atom } from "jotai"

interface Item {
    name: string;
    value: string;
}

export interface Variant {
    name: Item[]
    description?: string
    price: string
    quantity: string
    warnLevel?: string
}

const variantsAtom = atom<Variant[]>([])

export default variantsAtom