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
    Receipt: Receipt[];
    cart: Cart[];
    total: number;
}

export interface Receipt {
    Payment: Payment[];
}

export interface Payment {
    id: string;
    receiptId: string;
    cash: number;
    mpesa: number;
    mpesa_name: string;
    mpesa_transaction_id: string;
    mpesa_phone_no: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
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
    logo: string;
    email: string;
}
