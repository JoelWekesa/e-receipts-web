export interface Invoice {
    id: string;
    billingAccountId: string;
    status: string;
    totalAmount: number;
    issuedAt: Date;
    dueDate: Date;
    paidAt: Date;
    BillingItem: BillingItem[];
}

export interface BillingItem {
    id: string;
    title: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    invoiceId: string;
}

