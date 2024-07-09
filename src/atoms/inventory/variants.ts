import { Variant } from "@/models/inventory/inventory";
import { atom } from "jotai";



const variantsAtom = atom<Variant[]>([])

export const variantAtom = atom<Variant | null>(null)

export default variantsAtom