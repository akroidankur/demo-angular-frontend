import { Permissions } from "./permissions";

export interface Role {
    _id: string;
    roleName: string;
    roleDescription: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    rolePermissions: Permissions;
}