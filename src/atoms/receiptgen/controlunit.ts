import { atom } from "jotai";

export interface ControlUnit {
    title: string;
    value: string;
}

export const controlUnitAtom = atom<ControlUnit[]>([])