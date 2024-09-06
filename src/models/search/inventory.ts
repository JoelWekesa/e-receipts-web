export interface SearchInventory {
    hits: Hit[];
    nbHits: number;
    exhaustiveNbHits: boolean;
    query: string;
    limit: number;
    offset: number;
    processingTimeMs: number;
}

export interface Hit {
    id: string
    name: string;
    nameId: string;
    description: string;
    storeId: string;
    categoryId: string;
    thumbnail: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedById: null;
    userId: string;
    price: number;
    store: Category;
    category: Category;
    Variant: Variant[];
}

export interface Variant {
    id: string;
    name: NameElement[];
    variant_name: string;
    discount: number;
    description: string;
    price: number;
    quantity: number;
    inventoryId: string
    warnLevel: number;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface NameElement {
    name: string;
    value: string;
}



export interface Category {
    id: string;
    name: string;
}
