import { atom } from "jotai";

export interface Loyalty {
    code: string;
    customer: string;
    points_earned: string;
}

export const loyaltyAtom = atom<Loyalty[]>([]);