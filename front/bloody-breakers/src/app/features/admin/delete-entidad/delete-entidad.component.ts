import { Component, inject, Inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { genericServiceInterface } from '../../../models/genericService.interface';
import { GENERIC_SERVICE } from '../../../core/services/generic-service.token';

@Component({
  selector: 'app-delete-entidad',
  standalone: true,
  templateUrl: './delete-entidad.component.html',
  imports: [CommonModule, FormsModule],
})
export class DeleteEntidadComponent<T extends { id: number }> implements OnInit {
  @Input() tipo = 'elemento';

  readonly servicio = inject<genericServiceInterface<T>>(GENERIC_SERVICE);
  readonly entidades = signal<T[]>([]);
  seleccionadoId: number | null = null;

  ngOnInit(): void {
    const route = inject(ActivatedRoute);
    this.tipo = route.snapshot.data['tipo'] ?? this.tipo;

    this.servicio.getAll().subscribe({
      next: (data) => this.entidades.set(data),
      error: (e) => console.error(`Error al cargar ${this.tipo}s`, e),
    });
  }

  entidadSeleccionada(): T | null {
    return this.entidades().find(e => e.id === this.seleccionadoId) ?? null;
  }

  urlImagen(entidad: any): string | null {
    for (const key of Object.keys(entidad)) {
      if (key.toLowerCase().endsWith('url') && typeof entidad[key] === 'string') {
        return entidad[key];
      }
    }
    return null;
  }

  confirmarEliminacion(): void {
    const entidad = this.entidadSeleccionada();
    if (!entidad) return;

    const confirmar = window.confirm(`¿Estás seguro de eliminar este ${this.tipo}?`);
    if (!confirmar) return;

    this.servicio.delete(entidad.id).subscribe({
      next: () => {
        alert(`${this.tipo} eliminado correctamente`);
        this.entidades.set(this.entidades().filter(e => e.id !== entidad.id));
        this.seleccionadoId = null;
      },
      error: (e) => {
        console.error(`Error al eliminar ${this.tipo}`, e);
        alert('Error al eliminar');
      },
    });
  }
}
