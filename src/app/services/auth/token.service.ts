import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { DataStorageService } from '../datastorage/datastorage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private dataStorageService = inject(DataStorageService);
  isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor() {
    console.log('Checking token validity. . .');
    this.checkTokenValidity();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  setToken(token: string) {
    try {
      this.updateToken(token, true);
    } catch (error) {
      console.error('Handled Error: Error setting token:', error);
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await this.dataStorageService.getStorage('jwt');
      return token ? token : null;
    } catch (error) {
      console.error('Handled Error: Error getting token:', error);
      return null;
    }
  }

  private updateToken(token: string, status: boolean) {
    this.isAuthenticated.set(status);
    if (token !== '' && status) {
      this.dataStorageService.setStorage('jwt', token);
    }
  }

  removeToken() {
    try {
      this.updateToken('', false);
      this.dataStorageService.clearStorage();
    } catch (error) {
      console.error('Handled Error: Error removing token:', error);
    }
  }

  private async checkTokenValidity() {
    const token = await this.getToken();
    if (token) {
      try {
        const tokenData = this.parseToken(token);
        const expirationTime = tokenData.exp * 1000;

        if (!isNaN(expirationTime) && expirationTime > Date.now()) {
          this.updateToken(token, true);
        } else {
          this.removeToken();
        }
      } catch (error) {
        console.error('Handled Error: Error checking token validity:', error);
        this.removeToken();
      }
    } else {
      this.removeToken();
    }
  }

  private parseToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Handled Error: Error parsing token:', error);
      throw error;
    }
  }
}
