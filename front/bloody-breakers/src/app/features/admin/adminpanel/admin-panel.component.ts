import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, Route } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';
import { NgClass } from '@angular/common';

type Operacion = 'create' | 'update' | 'delete';

interface AdminRuta {
  entidad: string;
  operaciones: Operacion[];
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, RouterOutlet,NgClass],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  rutasAgrupadas: AdminRuta[] = [];

  constructor() {
    const rutasHijas = this.router.config.find(r => r.path === 'admin')?.children ?? [];

    const mapa = new Map<string, Set<Operacion>>();

    rutasHijas.forEach((ruta: Route) => {
      const path = ruta.path ?? ''; // ej. 'mundos/create'
      const [entidad, operacion] = path.split('/') as [string, Operacion];

      if (!entidad || !operacion) return;

      if (!mapa.has(entidad)) {
        mapa.set(entidad, new Set<Operacion>());
      }

      mapa.get(entidad)!.add(operacion);
    });

    this.rutasAgrupadas = Array.from(mapa.entries()).map(([entidad, ops]) => ({
      entidad,
      operaciones: Array.from(ops)
    }));
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
