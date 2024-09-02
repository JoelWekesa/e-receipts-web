export interface Team {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    permissionId: string;
    store: Store;
    permission: Permission;
}

export interface Permission {
    id: string;
    permission: string;
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
    updatedById: string;
    access_id: null;
    createdAt: Date;
    updatedAt: Date;
    displayName: string;
}
