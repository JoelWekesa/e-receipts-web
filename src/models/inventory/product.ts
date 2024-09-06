export interface Product {
    id: string;
    name: NameElement[];
    variant_name: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    inventoryId: string;
    warnLevel: number;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    inventory: Inventory;
}

export interface Inventory {
    id: string;
    name: string;
    nameId: string;
    description: string;
    storeId: string;
    categoryId: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedById: null;
    userId: string;
}

export interface NameElement {
    name: string;
    value: string;
}

