import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { Imagen } from '../../../models/imagen.model';

@Component({
  selector: 'app-delete-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-imagen.component.html',
})
export class DeleteImagenComponent implements OnInit {
  private imagenService = inject(ImagenesService);

  readonly imagenes = signal<Imagen[]>([]);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.imagenService.getAll().subscribe({
      next: (data) => this.imagenes.set(data),
      error: () => this.error.set('Error al cargar las imágenes'),
    });
  }

  eliminar(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar esta imagen?');
    if (!ok) return;

    this.imagenService.delete(id).subscribe({
      next: () => {
        this.imagenes.set(this.imagenes().filter(i => i.id !== id));
        this.mensaje.set('Imagen eliminada correctamente');
      },
      error: () => this.error.set('Error al eliminar la imagen'),
    });
  }
}
