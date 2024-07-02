export interface Category {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
}

export interface Store {
    name: string;
    logo: string;
    User_Store_createdByIdToUser: UserStoreCreatedByIDToUser;
}

export interface UserStoreCreatedByIDToUser {
    name: string | null;
}
