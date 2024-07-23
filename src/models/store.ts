

export interface Store {
    id: string;
    name: string;
    displayName: string;
    address: string;
    phone: string;
    email: string;
    vat_reg_no?: string;
    pin_no?: string;
    logo: string;
    createdById: string;
    updatedById?: string;
    access_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TopStore {
    displayName: string;
    amount: number;
}

export interface TopCustomers {
    _count: Count;
    name: string;
}

export interface Count {
    name: number;
}


