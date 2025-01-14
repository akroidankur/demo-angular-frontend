import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router)

  if (tokenService.isLoggedIn()) {
    return true;
  }
  else {
    router.navigateByUrl('')
    return false;
  }
};
