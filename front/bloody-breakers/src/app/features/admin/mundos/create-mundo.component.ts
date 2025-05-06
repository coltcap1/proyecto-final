import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MundosService } from '../../../core/services/mundos.service';

@Component({
  selector: 'app-create-mundo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-mundo.component.html'
})
export class CreateMundoComponent {
  private fb = inject(FormBuilder);
  private mundoService = inject(MundosService);
  private router = inject(Router);

  readonly mundoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    historia: ['', Validators.required]
  });

  readonly creado = signal(false);
  readonly error = signal<string | null>(null);

  onSubmit(): void {
    if (this.mundoForm.invalid) return;

    this.mundoService.create(this.mundoForm.value).subscribe({
      next: () => {
        this.creado.set(true);
        this.router.navigate(['/mundos']); // redirigir o mostrar mensaje
      },
      error: (err) => {
        this.error.set('Error al crear mundo');
        console.error(err);
      }
    });
  }
}
