export interface Roles{
    _id: string;
    name?: string;
}

export interface Staff {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    password: any;
    phone: string;
    status: string;
    role: string | Roles;
    deleted?: boolean;
    deletedBy?: string | null;
}
