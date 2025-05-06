import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Rol recibido:', response.rol); // 👈 debug
        this.loginService.guardarCredenciales(response.token, response.rol);
        this.toastr.success('Sesión iniciada correctamente');
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastr.error('Credenciales inválidas o error de servidor');
        this.errorMessage = '';
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
