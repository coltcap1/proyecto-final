import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../../core/services/personajes.service';
import { Personaje } from '../../models/personaje.model';

@Component({
  selector: 'app-personaje-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.scss']
})
export class PersonajeListComponent implements OnInit {

  personajes = signal<Personaje[]>([]);
  seleccionado = signal<Personaje | null>(null);

  private personajesService = inject(PersonajesService);

  ngOnInit(): void {
    this.personajesService.getMockPersonajes().subscribe({
      next: (data) => this.personajes.set(data),
      error: (err) => console.error('Error al cargar personajes:', err)
    });
  }

  seleccionar(personaje: Personaje) {
    this.seleccionado.set(personaje);
  }
}
