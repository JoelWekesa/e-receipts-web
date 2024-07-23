export interface PendingInvite {
    id: string;
    teamId: string;
    email: string;
    fromId: string;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    team: Team;
}

export interface Team {
    name: string;
    store: Store;
    permission: Permission;
}

export interface Permission {
    permission: string;
}

export interface Store {
    displayName: string;
}
