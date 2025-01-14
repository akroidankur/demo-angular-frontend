export interface Customers {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    deleted?: boolean;
    deletedBy?: string | null;
}