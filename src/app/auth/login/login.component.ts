import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username?: string;
  password?: string;

  router = inject(Router);
  authService = inject(AuthService);

  login() {

    if (this.username==='admin' || this.password==='Admin123!') {
      // this.authService.login();
      this.authService.generateToken();
      this.router.navigate(['/home']);
    }
    else {
      Swal.fire('Error', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');
    }
  }

}
