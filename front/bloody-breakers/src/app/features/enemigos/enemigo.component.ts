import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../models/personaje.model';

@Component({
  selector: 'app-enemigo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enemigo.component.html',
  styleUrls: ['./enemigo.component.scss']
})
export class EnemigoComponent {
  @Input() enemigo!: Personaje;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
