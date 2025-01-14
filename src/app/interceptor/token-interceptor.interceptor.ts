import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>(observer => {
      this.tokenService.getToken().then(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        next.handle(request).subscribe({
          next: (event: HttpEvent<any>) => {
            observer.next(event);
          },
          error: (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 420) {
                this.tokenService.removeToken();
                this.router.navigateByUrl('');
              }
            }
            observer.error(err);
          },
          complete: () => {
            observer.complete();
          }
        });
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}


