export interface MyTeam {
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
    permission: string;
}

export interface Store {
    displayName: string;
}
