import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../models/personaje.model';
import { PersonajesService } from '../../core/services/personajes.service';
import { PersonajeComponent } from './personaje.component';
import { ScrollSectionDirective } from '../../shared/directives/scroll-section.directive';

@Component({
  selector: 'app-personaje-list',
  standalone: true,
  imports: [ScrollSectionDirective,CommonModule, PersonajeComponent],
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

  cerrarModal() {
    this.seleccionado.set(null);
  }
}
