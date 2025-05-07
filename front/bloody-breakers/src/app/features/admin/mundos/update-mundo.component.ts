import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mundo } from '../../../models/mundo.model';
import { MundosService } from '../../../core/services/mundos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-mundo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-mundo.component.html',
})
export class UpdateMundoComponent implements OnInit {
  private mundosService = inject(MundosService);
  private fb = inject(FormBuilder);

  readonly mundos = signal<Mundo[]>([]);
  readonly seleccionadoId = signal<number | null>(null);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly mundoSeleccionado = computed(() => {
    return this.mundos().find(m => m.id == this.seleccionadoId());
  });

  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    historia: ['', Validators.required]
  });

  ngOnInit(): void {
    this.mundosService.getAll().subscribe({
      next: (data) => this.mundos.set(data),
      error: () => this.error.set('Error al cargar los mundos')
    });

    // 👇 Efecto reactivo: actualiza el formulario cuando cambia el seleccionado
    effect(() => {
      const mundo = this.mundoSeleccionado();
      if (mundo) {
        this.form.patchValue({
          nombre: mundo.nombre,
          historia: mundo.historia
        });
      } else {
        this.form.reset();
      }
    });
  }

  actualizar(): void {
    const id = this.seleccionadoId();
    if (!id || this.form.invalid) return;

    const datosActualizados: Partial<Mundo> = this.form.value;

    this.mundosService.update(id, datosActualizados as Mundo).subscribe({
      next: () => this.mensaje.set('Mundo actualizado correctamente'),
      error: () => this.error.set('Error al actualizar el mundo')
    });
  }

}
