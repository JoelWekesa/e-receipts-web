export interface Inventory {
    id: string;
    name: string;
    description: string;
    storeId: string;
    categoryId: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedById: null;
    userId: string;
    store: Category;
    category: Category;
    Variant: Variant[];
}

export interface Variant {
    id?: string;
    name: Name[];
    description?: string;
    price: number;
    quantity: number;
    inventoryId: string;
    warnLevel: number;
    storeId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Name {
    name: string;
    value: string;
}

export interface Category {
    id: string;
    name: string;
}
