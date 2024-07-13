export interface MemberTeam {
    id:     string;
    teamId: string;
    userId: string;
    team:   Team;
}

export interface Team {
    name:       string;
    permission: Permission;
    store:      Store;
}

export interface Permission {
    permission: string;
}

export interface Store {
    name: string;
}
