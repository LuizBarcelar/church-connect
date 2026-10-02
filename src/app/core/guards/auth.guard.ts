import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isAuthenticated =
    localStorage.getItem('church_admin_authenticated') === 'true';

  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
