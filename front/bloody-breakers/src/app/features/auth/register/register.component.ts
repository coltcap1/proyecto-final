import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);

  private registerService = inject(RegisterService);
  protected loading = false;

  registerForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.loading = false;
      return;
    }

    this.registerService.register({ email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = '¡Registro exitoso! Ya puedes iniciar sesión.';
        this.errorMessage = '';
        this.registerForm.reset();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error al registrar. Intenta con otro correo.';
        this.successMessage = '';
      }
    });

  }
}
