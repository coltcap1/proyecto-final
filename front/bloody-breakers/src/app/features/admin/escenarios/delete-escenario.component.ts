import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { Escenario } from '../../../models/escenario.model';

@Component({
  selector: 'app-delete-escenario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-escenario.component.html',
})
export class DeleteEscenarioComponent implements OnInit {
  private escenarioService = inject(EscenariosService);

  readonly escenarios = signal<Escenario[]>([]);
  readonly error = signal<string | null>(null);
  readonly mensaje = signal<string | null>(null);

  ngOnInit(): void {
    this.escenarioService.getAll().subscribe({
      next: (data) => this.escenarios.set(data),
      error: () => this.error.set('Error al cargar los escenarios'),
    });
  }

  eliminar(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar este escenario?');
    if (!ok) return;

    this.escenarioService.delete(id).subscribe({
      next: () => {
        this.escenarios.set(this.escenarios().filter(e => e.id !== id));
        this.mensaje.set('Escenario eliminado correctamente');
      },
      error: () => this.error.set('Error al eliminar el escenario'),
    });
  }
}
