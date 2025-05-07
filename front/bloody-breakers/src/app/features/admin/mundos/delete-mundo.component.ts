import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MundosService } from '../../../core/services/mundos.service';
import { Mundo } from '../../../models/mundo.model';

@Component({
  selector: 'app-delete-mundo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-mundo.component.html',
})
export class DeleteMundoComponent implements OnInit {
  private mundoService = inject(MundosService);

  readonly mundos = signal<Mundo[]>([]);
  readonly error = signal<string | null>(null);
  readonly mensaje = signal<string | null>(null);

  ngOnInit(): void {
    this.mundoService.getAll().subscribe({
      next: (data) => this.mundos.set(data),
      error: () => this.error.set('Error al cargar los mundos'),
    });
  }

  eliminar(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar este mundo?');
    if (!ok) return;

    this.mundoService.delete(id).subscribe({
      next: () => {
        this.mundos.set(this.mundos().filter(m => m.id !== id));
        this.mensaje.set('Mundo eliminado correctamente');
      },
      error: () => this.error.set('Error al eliminar el mundo'),
    });
  }
}
