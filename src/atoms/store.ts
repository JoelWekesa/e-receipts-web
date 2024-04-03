import { Store } from "@/models/store";
import { atom } from "jotai";

export const storeAtom = atom<Store | null>(null)