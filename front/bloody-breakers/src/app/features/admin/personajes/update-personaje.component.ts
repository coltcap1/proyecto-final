import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje } from '../../../models/personaje.model';
import { Mundo } from '../../../models/mundo.model';
import { PersonajesService } from '../../../core/services/personajes.service';
import { MundosService } from '../../../core/services/mundos.service';

@Component({
  selector: 'app-update-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-personaje.component.html',
})
export class UpdatePersonajeComponent implements OnInit {
  private personajeService = inject(PersonajesService);
  private mundoService = inject(MundosService);
  private fb = inject(FormBuilder);

  readonly personajes = signal<Personaje[]>([]);
  readonly mundos = signal<Mundo[]>([]);
  readonly seleccionadoId = signal<number | null>(null);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    historia: ['', Validators.required],
    iconoUrl: ['', [Validators.required, this.imgurUrlValidator]],
    esEnemigo: [false],
    id_mundo: [null, Validators.required]
  });

  personajeSeleccionado: Personaje | null = null;

  ngOnInit(): void {
    this.personajeService.getAll().subscribe({
      next: (data) => this.personajes.set(data),
      error: () => this.error.set('Error al cargar los personajes')
    });

    this.mundoService.getAll().subscribe({
      next: (data) => this.mundos.set(data),
      error: () => this.error.set('Error al cargar los mundos')
    });
  }

  seleccionar(id: number): void {
    this.seleccionadoId.set(id);
    const personaje = this.personajes().find(p => p.id == id);
    this.personajeSeleccionado = personaje ?? null;

    if (personaje) {
      this.form.patchValue({
        nombre: personaje.nombre,
        historia: personaje.historia,
        iconoUrl: personaje.iconoUrl,
        esEnemigo: personaje.esEnemigo,
        id_mundo: personaje.id_mundo
      });
    } else {
      this.form.reset();
    }
  }

  actualizar(): void {
    const id = this.seleccionadoId();
    if (!id || this.form.invalid) return;

    const datos: Partial<Personaje> = this.form.value;

    this.personajeService.update(id, datos as Personaje).subscribe({
      next: () => this.mensaje.set('Personaje actualizado correctamente'),
      error: () => this.error.set('Error al actualizar el personaje')
    });
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const regex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return regex.test(value) ? null : { imgurUrl: true };
  }
}
