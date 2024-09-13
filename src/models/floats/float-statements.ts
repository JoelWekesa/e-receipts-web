export interface FloatStatement {
    id: string;
    floatId: string;
    approvalId: null | string;
    floatTransactionId: null | string;
    amount: number;
    balance: number;
    createAt: Date;
    floatTransaction: Aprroval | null;
    aprroval: Aprroval | null;
}

export interface Aprroval {
    user: User;
}

export interface User {
    name: string;
    email: string;
    phone: null;
}
