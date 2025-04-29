import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Escenario } from '../../models/escenario.model';

@Component({
  selector: 'app-escenario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.scss']
})
export class EscenarioComponent {
  @Input() escenario!: Escenario;
}
