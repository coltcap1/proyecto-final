import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../models/personaje.model';
import { PersonajesService } from '../../core/services/personajes.service';
import { EnemigoComponent } from './enemigo.component';
import { ScrollSectionDirective } from '../../shared/directives/scroll-section.directive';

@Component({
  selector: 'app-enemigo-list',
  standalone: true,
  imports: [ScrollSectionDirective, CommonModule, EnemigoComponent],
  templateUrl: './enemigo-list.component.html',
  styleUrls: ['./enemigo-list.component.scss']
})
export class EnemigoListComponent implements OnInit {
  enemigos = signal<Personaje[]>([]);
  seleccionado = signal<Personaje | null>(null);

  private personajesService = inject(PersonajesService);

  ngOnInit(): void {
    this.personajesService.getMockPersonajes().subscribe({
      next: (data) => this.enemigos.set(data),
      error: (err) => console.error('Error al cargar personajes:', err)
    });
  }

  seleccionar(enemigo: Personaje) {
    this.seleccionado.set(enemigo);
  }

  cerrarModal() {
    this.seleccionado.set(null);
  }
}
