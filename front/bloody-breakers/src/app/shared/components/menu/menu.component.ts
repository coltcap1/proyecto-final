import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isOpen = signal(false);

  // Simulación de login y rol (esto luego se conectaría a tu servicio de auth real)
  isLoggedIn = signal(false); // simulador, true si está logeado
  userRole = signal<string>(''); // simulador, puede ser 'ADMIN' o 'USER'

  // menuItems = [
  //   { label: 'Inicio', path: '#inicio' },
  //   { label: 'Mundos', path: '#mundos'},
  //   { label: 'Personajes', path: '#personajes' },
  //   { label: 'Enemigos', path: '#enemigos'},
  //   { label: 'Escenarios', path: '#escenarios'},
  //   { label: 'Documentación', path: '#documentacion' },
  // ];

  menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Mundos', path: '/mundos' },
    { label: 'Personajes', path: '/personajes' },
    { label: 'Enemigos', path: '/enemigos' },
    { label: 'Escenarios', path: '/escenarios' },
    { label: 'Documentación', path: '/documentacion' },
    { label: 'Login', path: '/login' },
    { label: 'Registro', path: '/register' } // Nuevo
  ];
  

  visibleMenuItems = computed(() => {
    const items = [...this.menuItems];
    if (!this.isLoggedIn()) {
      items.push({ label: 'Login', path: '#login' })
    }
    if (this.isLoggedIn() && this.userRole() === 'ADMIN') {
      items.push({ label: 'Admin', path: '#admin'});
    }
    return items;
  });


  toggleMenu() {
    this.isOpen.update(open => !open);
  }
}
