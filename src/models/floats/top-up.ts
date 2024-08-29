export interface FloatTopUp {
    id: string;
    floatId: string;
    amount: number;
    transactionId: string;
    userId: string;
    createdAt: Date;
    user: User;
}

export interface User {
    name: string;
    email: string;
    phone: null;
}
