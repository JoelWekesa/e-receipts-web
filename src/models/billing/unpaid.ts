export interface UnpaidInvoices {
    invoices: Invoice[];
    balanceDue: number;
}

export interface Invoice {
    id: string;
    billingAccountId: string;
    status: string;
    totalAmount: number;
    issuedAt: Date;
    dueDate: Date;
    paidAt: null;
}
