import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mundo } from '../../../models/mundo.model';
import { Habilidad } from '../../../models/habilidad.model';
import { PersonajesService } from '../../../core/services/personajes.service';
import { MundosService } from '../../../core/services/mundos.service';
import { HabilidadesService } from '../../../core/services/habilidades.service';

@Component({
  selector: 'app-create-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-personaje.component.html'
})
export class CreatePersonajeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private personajeService = inject(PersonajesService);
  private mundoService = inject(MundosService);
  private habilidadService = inject(HabilidadesService);
  private router = inject(Router);

  readonly personajeForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    historia: ['', Validators.required],
    esEnemigo: [false],
    iconoUrl: ['', [Validators.required, this.imgurUrlValidator]],
    id_mundo: [null, Validators.required],
    habilidadId: [null] // opcional
  });

  readonly mundos = signal<Mundo[]>([]);
  readonly habilidades = signal<Habilidad[]>([]);
  readonly creado = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.mundoService.getAll().subscribe({
      next: (data) => this.mundos.set(data),
      error: () => this.error.set('Error al cargar mundos')
    });

    this.habilidadService.getAll().subscribe({
      next: (data) => this.habilidades.set(data),
      error: () => this.error.set('Error al cargar habilidades')
    });
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const imgurRegex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return imgurRegex.test(value) ? null : { imgurUrl: true };
  }

  isValidImgurUrl(url: string): boolean {
    return /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i.test(url);
  }

  iconoUrlPreview(): string | null {
    const url = this.personajeForm.get('iconoUrl')?.value;
    return this.isValidImgurUrl(url) ? url : null;
  }


  onSubmit(): void {
    if (this.personajeForm.invalid) return;

    const { habilidadId, ...personajeData } = this.personajeForm.value;

    // Agregar habilidad solo si se seleccionó
    const payload = habilidadId
      ? { ...personajeData, HABILIDADES: [{ id: habilidadId }] }
      : { ...personajeData, HABILIDADES: [] };

    this.personajeService.create(payload).subscribe({
      next: () => {
        this.creado.set(true);
        this.router.navigate(['/personajes']);
      },
      error: (e) => {
        this.error.set('Error al crear personaje');
        console.error(e);
      }
    });
  }
}
