import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../models/personaje.model';
import { PersonajesService } from '../../core/services/personajes.service';
import { EnemigoComponent } from './enemigo.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-enemigo-list',
  standalone: true,
  imports: [CommonModule, EnemigoComponent, LoaderComponent],
  templateUrl: './enemigo-list.component.html',
  styleUrls: ['./enemigo-list.component.scss']
})
export class EnemigoListComponent implements OnInit {
  enemigos = signal<Personaje[]>([]);
  seleccionado = signal<Personaje | null>(null);

  private personajesService = inject(PersonajesService);

  ngOnInit(): void {
    this.personajesService.getAll().subscribe({
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
