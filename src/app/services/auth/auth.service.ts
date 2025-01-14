import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Log } from '../../interfaces/logs/log';
import { LoginResponse } from '../../interfaces/logs/login-response';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { DataStorageService } from '../datastorage/datastorage.service';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endPoint: string = '/auth/login';
  private dataStorageService = inject(DataStorageService)
  private permissionsService = inject(PermissionsService)
  private apiService = inject(ApiService)
  private tokenService = inject(TokenService)

  constructor(
    ) { }


  logIn(log: Log): Observable<LoginResponse> {
    this.tokenService.removeToken();

    return this.apiService.post<any>(this.endPoint, log).pipe(
      switchMap((response: LoginResponse) => {
        this.tokenService.setToken(response.token);
        this.permissionsService.permissions.update(() => response.user.permissions)
        const userDetailsStorage$ = this.dataStorageService.setStorage('user-details', JSON.stringify(response.user));
        const permissionsStorage$ = this.dataStorageService.setStorage('permissions', JSON.stringify(response.user.permissions));

        return forkJoin([of(response), userDetailsStorage$, permissionsStorage$]);
      }),
      map(([response, _, __]) => response),
      catchError(error => {
        console.error('Handled Error: Error during login:', error);
        throw error;
      })
    );
  }

}
