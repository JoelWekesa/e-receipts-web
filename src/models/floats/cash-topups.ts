export interface CashTopUp {
    id: string;
    cashAtHandId: string;
    amount: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: CreatedBy;
}

export interface CreatedBy {
    name: string;
    email: string;
    phone: null;
}
