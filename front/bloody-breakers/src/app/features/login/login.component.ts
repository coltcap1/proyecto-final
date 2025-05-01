import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);

  @Output() loginSuccess = new EventEmitter<void>();
  @Output() solicitaRegistro = new EventEmitter<void>();

  loginForm!: FormGroup;
  errorMessage = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

/*
asegurarme que la API devuelva:
{
  "token": "jwt...",
  "role": "ADMIN" // o "USER"
}

*/

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        this.loginService.guardarToken(response.token);
        sessionStorage.setItem('role', response.role); // guardamos el rol del usuario
        this.loginSuccess.emit(); // notifica al componente superior
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas o error de servidor';
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }
  
  pedirRegistro() {
    this.solicitaRegistro.emit();
  }
}
