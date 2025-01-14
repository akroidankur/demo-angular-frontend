import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DataStorageService } from '../datastorage/datastorage.service';
import { Staff } from '../../interfaces/staff/staff';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  private readonly DATA_STORAGE_KEY = 'staffs';
  private readonly path = '/staffs';

  private readonly apiService = inject(ApiService);
  private readonly dataStorageService = inject(DataStorageService);

  staffs: WritableSignal<Staff[]> = signal([]);

  constructor() {
    this.initializeStaffs();
  }

  private initializeStaffs(): void {
    this.dataStorageService.getStorage(this.DATA_STORAGE_KEY).then(storedData => {
      if (storedData) {
        this.staffs.set(JSON.parse(storedData));
      } else {
        this.updateStaffsFromApi();
      }
    });
  }

  private updateStaffsFromApi(): void {
    this.apiService.get<Staff[]>(this.path).pipe(
      tap(async staffs => {
        this.staffs.set(staffs);
        await this.dataStorageService.setStorage(this.DATA_STORAGE_KEY, JSON.stringify(staffs));
      }),
      catchError(error => {
        console.error('Error fetching staff data:', error);
        return of([]);
      })
    ).subscribe();
  }

  getAllStaffs(): void {
    if (this.staffs().length === 0) {
      this.updateStaffsFromApi();
    }
  }

  createStaff(staff: Staff): Observable<Staff> {
    return this.apiService.post<Staff>(this.path, staff).pipe(
      tap(() => this.updateStaffsFromApi()),
      catchError(error => {
        console.error('Error creating staff:', error);
        throw error;
      })
    );
  }

  updateStaff(staff: Staff): Observable<Staff> {
    return this.apiService.patch<Staff>(`${this.path}/${staff._id}`, staff).pipe(
      tap(() => this.updateStaffsFromApi()),
      catchError(error => {
        console.error('Error updating staff:', error);
        throw error;
      })
    );
  }

  deleteStaff(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`).pipe(
      tap(() => this.updateStaffsFromApi()),
      catchError(error => {
        console.error('Error deleting staff:', error);
        throw error;
      })
    );
  }
}
