import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../../../core/services/personajes.service';
import { Personaje } from '../../../models/personaje.model';

@Component({
  selector: 'app-delete-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-personaje.component.html',
})
export class DeletePersonajeComponent implements OnInit {
  private personajeService = inject(PersonajesService);

  readonly personajes = signal<Personaje[]>([]);
  readonly error = signal<string | null>(null);
  readonly mensaje = signal<string | null>(null);

  ngOnInit(): void {
    this.personajeService.getAll().subscribe({
      next: (data) => this.personajes.set(data),
      error: () => this.error.set('Error al cargar los personajes'),
    });
  }

  eliminar(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar este personaje?');
    if (!ok) return;

    this.personajeService.delete(id).subscribe({
      next: () => {
        this.personajes.set(this.personajes().filter(p => p.id !== id));
        this.mensaje.set('Personaje eliminado correctamente');
      },
      error: () => this.error.set('Error al eliminar el personaje'),
    });
  }
}
