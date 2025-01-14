import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, of, defer, firstValueFrom } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { Customers } from '../../interfaces/customer/customers';
import { ApiService } from '../api/api.service';
import { DataStorageService } from '../datastorage/datastorage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly DATA_STORAGE_KEY: string = 'customers'
  private readonly path: string = '/customers';

  private readonly apiService: ApiService = inject(ApiService)
  private readonly dataStorageService: DataStorageService = inject(DataStorageService)

  private customersSubject: BehaviorSubject<Customers[]> = new BehaviorSubject<Customers[]>([]);

  constructor() { }

  private updateCustomersSubject(): Observable<Customers[]> {
    return this.apiService.get<Customers[]>(this.path).pipe(
      tap(async (customers: Customers[]) => {
        this.customersSubject.next(customers);
        await this.dataStorageService.setStorage(this.DATA_STORAGE_KEY, JSON.stringify(customers));
      }),
      catchError(error => {
        console.error('Handled Error: Error fetching customers:', error);
        throw error;
      })
    );
  }

 async fetchAllCustomers(): Promise<void> {
    await firstValueFrom(this.updateCustomersSubject());
  }

  getAllCustomers(): Observable<Customers[]> {
    return of(null).pipe(
      switchMap(async () => {
        const customersSubjectValue = this.customersSubject.value;
        if (customersSubjectValue.length > 0) {
          return customersSubjectValue;
        } else {
          try {
            const storedData: string | null = await this.dataStorageService.getStorage(this.DATA_STORAGE_KEY);
            if (storedData) {
              const parsedData: Customers[] = JSON.parse(storedData);
              return parsedData;
            } else {
              throw new Error('No customer data available');
            }
          } catch (error) {
            throw new Error('Error fetching customers from storage');
          }
        }
      }),
      catchError(() => this.updateCustomersSubject())
    );
  }

  createCustomer(customer: Customers): Observable<Customers> {
    return this.apiService.post<Customers>(this.path, customer).pipe(
      tap(() => this.updateCustomersSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error creating customers:', error);
        throw error;
      })
    );
  }
  
  updateCustomer(customer: Customers): Observable<Customers> {
    return this.apiService.patch<Customers>(`${this.path}/${customer._id}`, customer).pipe(
      tap(() => this.updateCustomersSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error updating customers:', error);
        throw error;
      })
    );
  }

  deleteCustomer(id: string): Observable<{}> {
    return this.apiService.delete<{}>(`${this.path}/${id}`).pipe(
      tap(() => this.updateCustomersSubject().subscribe()),
      catchError(error => {
        console.error('Handled Error: Error deleting customers:', error);
        throw error;
      })
    );
  }

}