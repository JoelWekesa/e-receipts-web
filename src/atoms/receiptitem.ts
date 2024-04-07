import { atom } from "jotai";

export interface ReceiptItem {
    item: string;
    quantity: string;
    price: string;
}

export const receiptItemsAtom = atom<ReceiptItem[]>([])

export const receiptItemAtom = atom<ReceiptItem>({
    item: '',
    quantity: '',
    price: '',
})