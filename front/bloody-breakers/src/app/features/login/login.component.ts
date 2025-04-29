import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    this.loginService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.loginService.guardarToken(response.token);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.errorMessage = 'Credenciales incorrectas o error de servidor.';
          console.error(error);
        }
      });
  }
}
