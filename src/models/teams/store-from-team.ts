export interface StoreFromTeam {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    permissionId: string;
    store: Store;
}

export interface Store {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    vat_reg_no: string;
    pin_no: string;
    logo: string;
    deleted: boolean;
    createdById: string;
    updatedById: string | null;
    access_id: string | null;
    createdAt: Date;
    updatedAt: Date;
}
