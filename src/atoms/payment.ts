import { atom } from "jotai"

export enum PaymentMethods {
    CASH = 'CASH',
    MPESA = 'MPESA',
}

interface Amount {
    mpesa: number;
    cash: number;
}

interface Payment {
    methods: PaymentMethods[]
    amount: Amount;
    client_name?: string
    mobile_no?: string
    m_pesa_transaction_id?: string
}

export const paymentAtom = atom<Payment>({
    methods: [],
    amount: {
        cash: 0,
        mpesa: 0
    },
})