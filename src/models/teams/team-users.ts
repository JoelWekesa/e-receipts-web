export interface TeamUser {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    permissionId: string;
    permission: Permission;
    store: Store;
    TeamMembers: TeamMember[];
}

export interface TeamMember {
    user: User;
}

export interface User {
    name: string;
    email: string;
    phone: string | null;
    image: string;
    id: string;
}

export interface Permission {
    permission: string;
}

export interface Store {
    name: string;
}
