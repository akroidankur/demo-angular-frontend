import { Permissions } from "../roles/permissions";

export interface User {
    _id: string;
    username: string;
    email: string;
    phone: string;
    roleID: string;
    roleName: string;
    permissions: Permissions;
    fullName: string;
}
export interface LoginResponse {
    token: string;
    user: User
}
