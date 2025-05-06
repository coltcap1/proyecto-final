import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personaje } from '../../../models/personaje.model';
import { HabilidadesService } from '../../../core/services/habilidades.service';
import { PersonajesService } from '../../../core/services/personajes.service';

@Component({
  selector: 'app-create-habilidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-habilidad.component.html'
})
export class CreateHabilidadComponent implements OnInit {
  private fb = inject(FormBuilder);
  private habilidadService = inject(HabilidadesService);
  private personajeService = inject(PersonajesService);
  private router = inject(Router);

  readonly habilidadForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dano: [null, Validators.required],
    iconoUrl: ['', [Validators.required, this.imgurUrlValidator]],
    personajeId: [null] // opcional
  });

  readonly personajes = signal<Personaje[]>([]);
  readonly creado = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.personajeService.getAll().subscribe({
      next: (data) => this.personajes.set(data),
      error: () => this.error.set('Error al cargar personajes')
    });
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const imgurRegex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return imgurRegex.test(value) ? null : { imgurUrl: true };
  }

  iconoUrlPreview(): string | null {
    const url = this.habilidadForm.get('iconoUrl')?.value;
    const regex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return regex.test(url) ? url : null;
  }

  onSubmit(): void {
    if (this.habilidadForm.invalid) return;

    const formData = this.habilidadForm.value;
    const personajeSeleccionado = this.personajes().find(p => p.id === formData.personajeId);

    const payload = {
      nombre: formData.nombre,
      dano: formData.dano,
      iconoUrl: formData.iconoUrl,
      PERSONAJES: personajeSeleccionado ? [personajeSeleccionado] : []
    };

    this.habilidadService.create(payload).subscribe({
      next: () => {
        this.creado.set(true);
        this.router.navigate(['/habilidades']);
      },
      error: (e) => {
        this.error.set('Error al crear habilidad');
        console.error(e);
      }
    });
  }
}
