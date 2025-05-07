import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Imagen } from '../../../models/imagen.model';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { MundosService } from '../../../core/services/mundos.service';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { PersonajesService } from '../../../core/services/personajes.service';
import { HabilidadesService } from '../../../core/services/habilidades.service';

@Component({
  selector: 'app-update-imagen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-imagen.component.html',
})
export class UpdateImagenComponent implements OnInit {
  private imagenService = inject(ImagenesService);
  private mundoService = inject(MundosService);
  private escenarioService = inject(EscenariosService);
  private personajeService = inject(PersonajesService);
  private habilidadService = inject(HabilidadesService);
  private fb = inject(FormBuilder);

  readonly imagenes = signal<Imagen[]>([]);
  readonly entidades = signal<any[]>([]);
  readonly seleccionadoId = signal<number | null>(null);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly tiposEntidad = ['MUNDO', 'ESCENARIO', 'PERSONAJE', 'HABILIDAD', 'EXTRAS'];

  imagenSeleccionada: Imagen | null = null;

  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    url: ['', [Validators.required, this.imgurUrlValidator]],
    descripcion: [''],
    tipo_entidad: ['', Validators.required],
    id_entidad: [null]
  });

  ngOnInit(): void {
    this.imagenService.getAll().subscribe({
      next: (data) => this.imagenes.set(data),
      error: () => this.error.set('Error al cargar las imágenes')
    });
  }

  seleccionar(id: number): void {
    this.seleccionadoId.set(id);
    const imagen = this.imagenes().find(i => i.id == id);
    this.imagenSeleccionada = imagen ?? null;

    if (imagen) {
      this.form.patchValue({
        nombre: imagen.nombre,
        url: imagen.url,
        descripcion: imagen.descripcion,
        tipo_entidad: imagen.tipo_entidad,
        id_entidad: imagen.id_entidad
      });
      this.cargarEntidades(imagen.tipo_entidad);
    } else {
      this.form.reset();
    }
  }

  cargarEntidades(tipo: string): void {
    this.entidades.set([]);
    this.form.get('id_entidad')?.setValue(null);

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
      default:
        this.entidades.set([]);
        break;
    }
  }

  onTipoEntidadChange(): void {
    const tipo = this.form.get('tipo_entidad')?.value;
    this.cargarEntidades(tipo);
  }

  actualizar(): void {
    const id = this.seleccionadoId();
    if (!id || this.form.invalid) return;

    const datos = this.form.value;

    this.imagenService.update(id, datos as Imagen).subscribe({
      next: () => this.mensaje.set('Imagen actualizada correctamente'),
      error: () => this.error.set('Error al actualizar la imagen')
    });
  }

  imgurUrlValidator(control: any) {
    const value = control.value as string;
    const regex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;
    return regex.test(value) ? null : { imgurUrl: true };
  }
}
