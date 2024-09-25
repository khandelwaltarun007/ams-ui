import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    if (route.routeConfig?.path === 'login') {
      router.navigate(['/dashboard']); // Adjust the route as necessary
      return false; // Prevent access to the login page
    }
  }
  return true;
};
