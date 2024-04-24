export interface Setting {
    id: string;
    userId: string;
    storeId?: string;
    createdAt: Date;
    updatedAt: Date;
    store?: Store;
}

export interface Store {
    name: string;
}
