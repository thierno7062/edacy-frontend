import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if(localStorage.getItem('token')) {
    console.log('utilisateur connecté');
    return true;
  }
  console.log('utilisateur non connecté');
  router.navigate(['/login']);
  return false;
};
