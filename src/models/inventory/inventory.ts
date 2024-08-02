export interface Inventory {
    id: string;
    name: string;
    nameId: string;
    description?: string;
    storeId: string;
    categoryId: string;
    thumbnail?: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedById: null;
    userId: string;
    price?: string | null | undefined;
    store: Category;
    category: Category;
    Variant: Variant[];
    Option: Option[];
}

export interface Option {
    id: string;
    name: string;
    options: string[];
    inventoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Variant {
    id: string;
    name: Name[];
    variant_name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryId: string;
    warnLevel: number;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Name {
    name: string;
    value: string;
}

export interface Category {
    id: string;
    name: string;
}
