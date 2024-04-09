import { atom } from "jotai"

export enum PaymentMethods {
    CASH = 'cash',
    MPESA = 'mpesa',
}

export interface MPESA {
    client_name: string
    mobile_no: string,
    amount: number,
    m_pesa_transaction_id: string,
}

export interface CASH {
    amount: number,
}

interface Payment {
    methods: PaymentMethods[]
    mpesa: MPESA
    cash: CASH
}

export const paymentAtom = atom<Payment>({
    methods: [],
    mpesa: {
        client_name: '',
        mobile_no: '',
        amount: 0,
        m_pesa_transaction_id: '',
    },
    cash: {
        amount: 0,
    },
})