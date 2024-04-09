import { atom } from "jotai";

export interface Loyalty {
    code: string;
    customer: string;
    points_earned: number;
}

export const loyaltyAtom = atom<Loyalty[]>([]);