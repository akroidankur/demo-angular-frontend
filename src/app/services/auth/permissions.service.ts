import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { DataStorageService } from '../datastorage/datastorage.service';
import { Permissions } from '../../interfaces/roles/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private dataService = inject(DataStorageService);
  permissions: WritableSignal<Permissions> = signal(defaultPermissions);

  constructor() {}

  async getPermissions(): Promise<string> {
    const permissions: string | null = await this.dataService.getStorage('permissions');
    if (permissions) {
      return permissions;
    } else {
      return JSON.stringify(this.permissions());
    }
  }
}

const defaultPermissions: Permissions = {
  staffPermissions: {
    createStaff: false,
    readStaff: false,
    updateStaff: false,
    deleteStaff: false,
    createCustomer: false,
    readCustomer: false,
    updateCustomer: false,
    deleteCustomer: false,
    createRole: false,
    readRole: false,
    updateRole: false,
    deleteRole: false
  },
  customerPermissions: {
    createData: false,
    readData: false,
    updateData: false,
    deleteData: false
  }
};
