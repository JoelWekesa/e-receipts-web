export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
}


export interface StoreOrder {
    id: string;
    createdAt: Date;
    customer: string;
    status: string;
    total: number;
}







