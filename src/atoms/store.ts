import { StoreDatum } from "@/models/store";
import { atom } from "jotai";

export const storeAtom = atom<StoreDatum | null>(null)