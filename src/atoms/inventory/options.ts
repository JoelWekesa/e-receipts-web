import { atom } from "jotai";

export interface Option {
    name: string;
    options: string[];
    id: string;
}


const optionsAtom = atom<Option[]>([]);


export default optionsAtom;