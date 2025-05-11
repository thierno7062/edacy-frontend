import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

   router = inject(Router); // Utiliser le router pour rediriger

  constructor() { }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    if (err.status === 401 || err.status === 403) {
      console.log("Le token n'est plus valid : ", err);
      localStorage.removeItem('token'); // Optionnel : nettoyer le token
      this.router.navigate(['/login']);
    }
    if (err.status === 400) {
      console.log('Bad request :', err);
    }
  }
}
