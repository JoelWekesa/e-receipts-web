export interface ClientOrder {
    id: string;
    cartId: string;
    userId: string;
    shippingId: string;
    storeId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
    shipping: Shipping;
    cart: Cart[];
}

export interface Cart {
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
    variant_name: string;
    name: Name[];
    price: number;
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

export interface Shipping {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
}

export interface Store {
    displayName: string;
    name: string;
}
