export interface Transaction {
    id: string;
    floatId: string;
    amount: number;
    evidence: string;
    userId: string;
    approved: boolean;
    rejected: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    float: Float;
    Approvals: Approval[];
    Rejection: Rejection[];
}

export interface Approval {
    id: string;
    userId: string;
    transactionId: string;
    approvedAt: Date;
    user: User;
}

export interface User {
    name: string;
    email: string;
    phone: null;
}

export interface Rejection {
    id: string;
    userId: string;
    transactionId: string;
    archived: boolean;
    reason: string;
    rejectedAt: Date;
    user: User;
}

export interface Float {
    storeId: string;
}
