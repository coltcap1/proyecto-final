import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabilidadesService } from '../../../core/services/habilidades.service';
import { Habilidad } from '../../../models/habilidad.model';

@Component({
  selector: 'app-delete-habilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-habilidad.component.html',
})
export class DeleteHabilidadComponent implements OnInit {
  private habilidadService = inject(HabilidadesService);

  readonly habilidades = signal<Habilidad[]>([]);
  readonly error = signal<string | null>(null);
  readonly mensaje = signal<string | null>(null);

  ngOnInit(): void {
    this.habilidadService.getAll().subscribe({
      next: (data) => this.habilidades.set(data),
      error: () => this.error.set('Error al cargar las habilidades'),
    });
  }

  eliminar(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar esta habilidad?');
    if (!ok) return;

    this.habilidadService.delete(id).subscribe({
      next: () => {
        this.habilidades.set(this.habilidades().filter(h => h.id !== id));
        this.mensaje.set('Habilidad eliminada correctamente');
      },
      error: () => this.error.set('Error al eliminar la habilidad'),
    });
  }
}
