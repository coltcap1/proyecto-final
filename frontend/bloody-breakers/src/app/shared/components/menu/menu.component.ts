import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isOpen = signal(false);

  menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Mundos', path: '/mundo' },
    { label: 'Personajes', path: '/personajes' },
    { label: 'Enemigos', path: '/enemigos' },
    { label: 'Escenarios', path: '/escenarios' },
    { label: 'Documentación', path: '/documentacion' },
  ];

  toggleMenu() {
    this.isOpen.update(open => !open);
  }
}
