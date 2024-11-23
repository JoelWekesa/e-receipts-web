export interface BillingAccount {
    id: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
}

export interface User {
    email: string;
}
