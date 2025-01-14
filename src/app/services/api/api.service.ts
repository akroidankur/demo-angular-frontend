import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: WritableSignal<string>;

  constructor(private http: HttpClient) {
    this.apiUrl = signal(environment.API_BASE_URL);
  }

  get<T>(path: string, params?: HttpParams, url: string = this.apiUrl()): Observable<T> {
    console.log(`GET REQ: ${url}, ${path}, ${params}`);

    return this.http.get<T>(`${url}${path}`, { params }).pipe(
      tap(res => console.log(`GET RES: ${url}, ${path}, ${params}:`, res)),
      catchError(error => {
        console.error(`Handled Error: Error during GET request to ${url}${path}:`, error);
        return throwError(() => error);
      })
    );
  }

  getById<T>(path: string, id: string | number, params?: HttpParams, url: string = this.apiUrl()): Observable<T> {
    console.log(`GET BY ID REQ: ${url}, ${path}/${id}, ${params}`);

    return this.http.get<T>(`${url}${path}/${id}`, { params }).pipe(
      tap(res => console.log(`GET BY ID RES: ${url}, ${path}/${id}, ${params}:`, res)),
      catchError(error => {
        console.error(`Handled Error: Error during GET BY ID request to ${url}${path}/${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  post<T>(path: string, body: T, url: string = this.apiUrl()): Observable<T> {
    console.log(`POST REQ: ${url}, ${path}, ${body}`);

    return this.http.post<T>(`${url}${path}`, body).pipe(
      tap(res => console.log(`POST RES: ${url}, ${path}, ${body}:`, res)),
      catchError(error => {
        console.error(`Handled Error: Error during POST request to ${url}${path}:`, error);
        return throwError(() => error);
      })
    );
  }

  patch<T>(path: string, body: T, url: string = this.apiUrl()): Observable<T> {
    console.log(`PATCH REQ: ${url}, ${path}, ${body}`);

    return this.http.patch<T>(`${url}${path}`, body).pipe(
      tap(res => console.log(`PATCH RES: ${url}, ${path}, ${body}:`, res)),
      catchError(error => {
        console.error(`Handled Error: Error during PATCH request to ${url}${path}:`, error);
        return throwError(() => error);
      })
    );
  }

  delete<T>(path: string, url: string = this.apiUrl()): Observable<T> {
    console.log(`DEL REQ: ${url}, ${path}`);

    return this.http.delete<T>(`${url}${path}`).pipe(
      tap(res => console.log(`DEL RES: ${url}, ${path}`, res)),
      catchError(error => {
        console.error(`Handled Error: Error during DELETE request to ${url}${path}:`, error);
        return throwError(() => error);
      })
    );
  }

  setApiUrl(url: string) {
    this.apiUrl.set(url);
  }
}
