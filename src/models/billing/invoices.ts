export enum InvoiceStatus {
    PENDING = "PENDING",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED",
    PAID = "PAID",
}

export interface Invoices {
    id: string;
    billingAccountId: string;
    status: InvoiceStatus;
    totalAmount: number;
    issuedAt: Date;
    dueDate: Date;
    paidAt: Date;
}
