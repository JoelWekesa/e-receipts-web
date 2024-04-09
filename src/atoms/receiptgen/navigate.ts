import { atom } from "jotai";

export enum Path {
    CLIENT_DETAILS = "clientDetails",
    RECEIPT_ITEM = 'receiptItem',
    PAYMENT = "payment",
    CONTROL_UNIT = "controlUnit",
    LOYALTY_POINTS = "loyaltyPoints",
}

export const navigateAtom = atom<Path>(Path.CLIENT_DETAILS);