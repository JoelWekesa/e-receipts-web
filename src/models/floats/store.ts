export interface StoreFloat {
    id: string;
    balance: number;
    storeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface StoreCash {
    id: string;
    floatId: string;
    balance: number;
    updatedAt: Date;
}
