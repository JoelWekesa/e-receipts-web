import { atom } from "jotai";

export interface ClientDetails {
    name: string,
    email?: string,
    phone: string,
}

export const clientDetailsAtom = atom<ClientDetails>({
    name: '',
    email: '',
    phone: '',
})