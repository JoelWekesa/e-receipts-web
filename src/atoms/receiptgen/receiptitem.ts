import { atom } from "jotai";

export interface ReceiptItem {
    item: string;
    quantity: number;
    price: number;
    discount: number;
    itemId?: string;
}

export const receiptItemsAtom = atom<ReceiptItem[]>([])

export const receiptItemAtom = atom<ReceiptItem | null>(null)