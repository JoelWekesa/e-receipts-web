import { Variant } from "@/models/inventory/inventory";
import { atom } from "jotai";

export const cartVariant = atom<Variant | undefined>(undefined)