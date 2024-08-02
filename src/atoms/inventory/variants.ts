import { Variant } from "@/models/inventory/inventory";
import { atom } from "jotai";

export type ModeVariant = Omit<Variant, 'id' | 'variant_name' | 'storeId' | 'createdAt' | 'updatedAt'>



const variantsAtom = atom<ModeVariant[]>([])

export const variantAtom = atom<ModeVariant | null>(null)

export default variantsAtom