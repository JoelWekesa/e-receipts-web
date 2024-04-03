

export interface Store {
    id: string;
    name: string;
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
