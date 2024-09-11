export interface CashStatement {
    id: string;
    amount: number;
    cashAtHandTopUpId: null | string;
    cashAtHandTransactionId: null | string;
    cashAtHandId: string;
    userId: string;
    createdAt: Date;
    balance: number;
    cashWithDrawalId: null | string;
    cashWithDrawal: Cash | null;
    cashAtHandTopUp: Cash | null;
    cashAtHandTransaction: CashAtHandTransaction | null;
}

export interface Cash {
    id: string;
    cashAtHandId: string;
    amount: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: CreatedBy;
    user?: CreatedBy;
}

export interface CreatedBy {
    name: string;
    email: string;
    phone: null;
}





export interface CashAtHandTransaction {
    id: string;
    approvalId: string;
    cashAtHandId: string;
    amount: number;
    createdAt: Date;
    approval: Approval;
}

export interface Approval {
    id: string;
    userId: string;
    transactionId: string;
    approvedAt: Date;
    user: CreatedBy;
}
