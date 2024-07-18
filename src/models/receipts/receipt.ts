export interface Receipt {
    id: string;
    storeId: string;
    name: string;
    phone: string;
    email: null | string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
    ReceiptItem: ReceiptItem[];
    Payment: Payment[];
    ControlUnit: ControlUnit[];
    Loyalty: Loyalty[];
}

export interface ControlUnit {
    title: string;
    value: string;
}

export interface Loyalty {
    code: string;
    customer: string;
    points_earned: string;
}

export interface Payment {
    cash: number;
    mpesa: number;
    mpesa_name: string;
    mpesa_transaction_id: string;
    mpesa_phone_no: string;
}


export interface ReceiptItem {
    item: string;
    price: number;
    quantity: number;
    discount: number;
}



export interface Store {
    name: string;
    phone: string;
    email: string;
    logo: string;
    address: string;
    vat_reg_no: string;
    pin_no: string;
}









