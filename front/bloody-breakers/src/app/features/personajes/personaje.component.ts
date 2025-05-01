import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../models/personaje.model';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent {
  @Input() personaje!: Personaje;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
