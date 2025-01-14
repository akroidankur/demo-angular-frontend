import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, tap, throwError } from 'rxjs';
import { Role } from '../../interfaces/roles/role';
import { ApiService } from '../api/api.service';
import { DataStorageService } from '../datastorage/datastorage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiService = inject(ApiService)
  private dataStorageService = inject(DataStorageService)

  private path: string = '/roles';
  private roleSubject: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  private updateRoleSubject(): Observable<Role[]> {
    return this.apiService.get<Role[]>(this.path).pipe(
      tap(async (roles: Role[]) => {
        this.roleSubject.next(roles);
        await this.dataStorageService.setStorage('roles', JSON.stringify(roles))
        if (this.isUpdate.value) {
          this.isUpdate.next(false)
        }
      }),
      catchError(error => {
        console.error('Handled Error: Error fetching roles:', error);
        throw error;
      })
    );
  }


 async fetchAllRoles(): Promise<void> {
  await firstValueFrom(this.updateRoleSubject());
  }

  async getAllRoles(): Promise<Role[]> {
    return new Promise<Role[]>(resolve => {
      const subscription = this.isUpdate.subscribe({
        next: async (value: boolean) => {
          if (value) {
            return;
          }
          const roles = await this.dataStorageService.getStorage('roles');
          if (roles) {
            const parsedRoles: Role[] = JSON.parse(roles);
            resolve(parsedRoles);
          } else {
            const parsedRoles: Role[] = this.roleSubject.value;
            resolve(parsedRoles);
          }
          subscription.unsubscribe();
        },
      });
    });
  }


  createRole(role: Role): Observable<Role> {
    return this.apiService.post<Role>(this.path, role).pipe(
      tap(() => this.updateRoleSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error creating role:', error);
        throw error;
      })
    );
  }

  updateRole(role: Role): Observable<Role> {
    return this.apiService.patch<Role>(`${this.path}/${role._id}`, role).pipe(
      tap(() => this.updateRoleSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error updating role:', error);
        throw error;
      })
    );
  }

  deleteRole(id: string): Observable<{}> {
    return this.apiService.delete<{}>(`${this.path}/${id}`).pipe(
      tap(() => this.updateRoleSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error deleting role:', error);
        throw error;
      })
    );
  }
}
