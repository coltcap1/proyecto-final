import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Imagen } from '../../models/imagen.model';
import { ImagenesService } from '../../core/services/imagenes.service';


@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  private imagenService = inject(ImagenesService);

  readonly imagenes = signal<Imagen[]>([]);
  readonly imagenActiva = signal<Imagen | null>(null);

  ngOnInit(): void {
    this.imagenService.getAll().subscribe({
      next: (data) => this.imagenes.set(data),
      error: () => console.error('Error al cargar imágenes')
    });
  }

  abrir(imagen: Imagen): void {
    this.imagenActiva.set(imagen);
  }

  cerrar(): void {
    this.imagenActiva.set(null);
  }
}
