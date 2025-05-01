import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscenarioComponent } from './escenario.component';
import { EscenariosService } from '../../core/services/escenarios.service';
import { Escenario } from '../../models/escenario.model';
import { ScrollSectionDirective } from '../../shared/directives/scroll-section.directive';

@Component({
  selector: 'app-escenario-list',
  standalone: true,
  imports: [ScrollSectionDirective,CommonModule, EscenarioComponent],
  templateUrl: './escenario-list.component.html',
  styleUrls: ['./escenario-list.component.scss']
})
export class EscenarioListComponent implements OnInit {

  escenarios = signal<Escenario[]>([]);

  private escenariosService = inject(EscenariosService);

  ngOnInit(): void {
    this.escenariosService.getMockEscenarios().subscribe({
      next: (data) => this.escenarios.set(data),
      error: (err) => console.error('Error al cargar escenarios:', err)
    });
  }
}
