import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  async setStorage(key: string, data: string): Promise<void> {
    if (this.isWeb()) {
      localStorage.setItem(key, data);
    } else {
      return;
    }
  }

  async getStorage(key: string): Promise<string | null> {
    if (this.isWeb()) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  async removeStorage(key: string): Promise<void> {
    if (this.isWeb()) {
      localStorage.removeItem(key);
    } else {
      return;
    }
  }

  async clearStorage(): Promise<void> {
    if (this.isWeb()) {
      localStorage.clear();
    } else {
      return;
    }
  }

  private isWeb(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
