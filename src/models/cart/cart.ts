export interface CartItem {
    id: string;
    cartId: string;
    variantId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    variant: Variant;
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
    inventory: Inventory;
}

export interface Inventory {
    name: string;
    thumbnail: string;
}

export interface Name {
    name: string;
    value: string;
}
