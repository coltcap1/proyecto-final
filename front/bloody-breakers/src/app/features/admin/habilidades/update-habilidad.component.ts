import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habilidad } from '../../../models/habilidad.model';
import { Personaje } from '../../../models/personaje.model';
import { HabilidadesService } from '../../../core/services/habilidades.service';
import { PersonajesService } from '../../../core/services/personajes.service';

@Component({
  selector: 'app-update-habilidad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-habilidad.component.html',
})
export class UpdateHabilidadComponent implements OnInit {
  private habilidadService = inject(HabilidadesService);
  private personajeService = inject(PersonajesService);
  private fb = inject(FormBuilder);

  readonly habilidades = signal<Habilidad[]>([]);
  readonly personajes = signal<Personaje[]>([]);
  readonly seleccionadoId = signal<number | null>(null);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  habilidadSeleccionada: Habilidad | null = null;

  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dano: [null, Validators.required],
    iconoUrl: ['', [Validators.required, this.imgurUrlValidator]],
    personajeId: [null]
  });

  ngOnInit(): void {
    this.habilidadService.getAll().subscribe({
      next: (data) => this.habilidades.set(data),
      error: () => this.error.set('Error al cargar las habilidades'),
    });

    this.personajeService.getAll().subscribe({
      next: (data) => this.personajes.set(data),
      error: () => this.error.set('Error al cargar los personajes'),
    });
  }

  seleccionar(id: number): void {
    this.seleccionadoId.set(id);
    const habilidad = this.habilidades().find(h => h.id == id);
    this.habilidadSeleccionada = habilidad ?? null;

    if (habilidad) {
      const personaje = habilidad.PERSONAJES?.[0]?.id ?? null;

      this.form.patchValue({
        nombre: habilidad.nombre,
        dano: habilidad.dano,
        iconoUrl: habilidad.iconoUrl,
        personajeId: personaje
      });
    } else {
      this.form.reset();
    }
  }

  actualizar(): void {
    const id = this.seleccionadoId();
    if (!id || this.form.invalid) return;

    const formValue = this.form.value;

    const personajeSeleccionado = this.personajes().find(p => p.id == formValue.personajeId);

    const payload: Partial<Habilidad> = {
      nombre: formValue.nombre,
      dano: formValue.dano,
      iconoUrl: formValue.iconoUrl,
      PERSONAJES: personajeSeleccionado ? [personajeSeleccionado] : []
    };

    this.habilidadService.update(id, payload as Habilidad).subscribe({
      next: () => this.mensaje.set('Habilidad actualizada correctamente'),
      error: () => this.error.set('Error al actualizar la habilidad'),
    });
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const regex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return regex.test(value) ? null : { imgurUrl: true };
  }
}
