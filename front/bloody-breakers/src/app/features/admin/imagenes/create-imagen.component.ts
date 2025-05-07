import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MundosService } from '../../../core/services/mundos.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { PersonajesService } from '../../../core/services/personajes.service';
import { HabilidadesService } from '../../../core/services/habilidades.service';

@Component({
  selector: 'app-create-imagen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-imagen.component.html'
})
export class CreateImagenComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private imagenService = inject(ImagenesService);

  private mundoService = inject(MundosService);
  private escenarioService = inject(EscenariosService);
  private personajeService = inject(PersonajesService);
  private habilidadService = inject(HabilidadesService);

  readonly tiposEntidad = ['MUNDO', 'ESCENARIO', 'PERSONAJE', 'HABILIDAD', 'EXTRAS'];
  readonly entidades = signal<any[]>([]); // Lista dinámica de objetos

  readonly imagenForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    url: ['', [Validators.required, this.imgurUrlValidator]],
    descripcion: [''],
    tipo_entidad: ['', Validators.required],
    id_entidad: [null] // quitar Validators.required

  });

  readonly creado = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {this.imagenForm.get('tipo_entidad')?.valueChanges.subscribe((tipo: string) => {
    this.entidades.set([]);
    this.imagenForm.get('id_entidad')?.setValue(null);
  
    const idEntidadControl = this.imagenForm.get('id_entidad');
  
    if (tipo === 'EXTRAS') {
      idEntidadControl?.clearValidators(); // no es obligatorio
      idEntidadControl?.updateValueAndValidity();
      return;
    }
  
    // Para otros tipos, sí es obligatorio
    idEntidadControl?.setValidators(Validators.required);
    idEntidadControl?.updateValueAndValidity();
  
    switch (tipo) {
      case 'MUNDO':
        this.mundoService.getAll().subscribe(data => this.entidades.set(data));
        break;
      case 'ESCENARIO':
        this.escenarioService.getAll().subscribe(data => this.entidades.set(data));
        break;
      case 'PERSONAJE':
        this.personajeService.getAll().subscribe(data => this.entidades.set(data));
        break;
      case 'HABILIDAD':
        this.habilidadService.getAll().subscribe(data => this.entidades.set(data));
        break;
    }
  });
  
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const imgurRegex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return imgurRegex.test(value) ? null : { imgurUrl: true };
  }

  iconoUrlPreview(): string | null {
    const url = this.imagenForm.get('url')?.value;
    const regex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return regex.test(url) ? url : null;
  }

  onSubmit(): void {
    if (this.imagenForm.invalid) return;

    const formData = this.imagenForm.value;

    const payload = {
      ...formData,
      id_entidad: formData.tipo_entidad === 'EXTRAS' ? 0 : formData.id_entidad
    };

    this.imagenService.create(payload).subscribe({
      next: () => {
        this.creado.set(true);
        this.router.navigate(['/imagenes']);
      },
      error: (e) => {
        this.error.set('Error al crear imagen');
        console.error(e);
      }
    });
  }

}
