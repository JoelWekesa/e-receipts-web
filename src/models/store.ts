export interface Store {
    data: StoreDatum[];
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    nextPage: number | boolean;
}

export interface StoreDatum {
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
