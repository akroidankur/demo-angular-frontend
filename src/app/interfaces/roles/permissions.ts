export interface StaffPermissions {
    createStaff: boolean;
    readStaff: boolean;
    updateStaff: boolean;
    deleteStaff: boolean;
    createCustomer: boolean;
    readCustomer: boolean;
    updateCustomer: boolean;
    deleteCustomer: boolean;
    createRole: boolean;
    readRole: boolean;
    updateRole: boolean;
    deleteRole: boolean;
}

export interface CustomerPermissions {
    createData: boolean;
    readData: boolean;
    updateData: boolean;
    deleteData: boolean;
}

export interface Permissions {
    staffPermissions: StaffPermissions;
    customerPermissions: CustomerPermissions;
}
