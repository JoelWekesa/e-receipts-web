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
    title: Title;
    value: Value;
}

export enum Title {
    CUSerialNo = "CU Serial No",
}

export enum Value {
    Cu1234Pnb = "CU1234PNB",
}

export interface Loyalty {
    code: Code;
    customer: CustomerEnum;
    points_earned: string;
}

export enum Code {
    Samplecode = "samplecode",
}

export enum CustomerEnum {
    JoelWekesa = "Joel Wekesa",
    JohnDoe = "John Doe",
}

export interface Payment {
    cash: number;
    mpesa: number;
    mpesa_name: CustomerEnum;
    mpesa_transaction_id: MpesaTransactionID;
    mpesa_phone_no: string;
}

export enum MpesaTransactionID {
    Mpesa1234678K = "MPESA1234678K",
    Mpr00100Thk = "MPR00100THK",
    SAMPLETrans = "SAMPLETrans",
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









