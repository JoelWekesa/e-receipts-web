export interface AddReceipt {
    storeId: string;
    name: string;
    phone: string;
    email?: string;
    items: Item[];
    cash: number;
    mpesa: number;
    mpesa_name: string;
    mpesa_phone_no: string;
    mpesa_transaction_id: string;
    control_units: ControlUnit[];
    loyalty: Loyalty[];
}

export interface ControlUnit {
    title: string;
    value: string;
}

export interface Item {
    item: string;
    price: number;
    quantity: number;
    discount: number;
}

export interface Loyalty {
    code: string;
    customer: string;
    points_earned: string;
}
