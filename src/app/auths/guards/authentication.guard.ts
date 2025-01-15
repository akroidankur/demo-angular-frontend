import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const token = await this.tokenService.getToken();

    if (token && this.tokenService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
