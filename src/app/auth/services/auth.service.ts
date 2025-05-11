import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8088';
  dataRequest = {
    username: 'admin',
    password: 'Admin123!'
  };
  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post(`${this.baseUrl}/api/auth/login`, this.dataRequest)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      });
  }
  logout(): void {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'success',
      title: 'Déconnexion réussie',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',

    });
  }
  isLogin(): boolean {
    return true;
  }
  generateToken(): string {
    this.http.get(`${this.baseUrl}/api/auth/generate-token`)
      .subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);

      });
    return '';
  }
}
