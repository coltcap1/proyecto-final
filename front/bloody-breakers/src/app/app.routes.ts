import { Routes } from '@angular/router';
import { HomeComponent } from './features/inicio/home.component';
import { MundoListComponent } from './features/mundo/mundo-list.component';
import { PersonajeListComponent } from './features/personajes/personaje-list.component';
import { EnemigoListComponent } from './features/enemigos/enemigo-list.component';
import { EscenarioListComponent } from './features/escenarios/escenario-list.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DocListComponent } from './features/documentacion/doc-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'mundos', pathMatch: 'full', component: MundoListComponent },
  { path: 'personajes', pathMatch: 'full', component: PersonajeListComponent },
  { path: 'enemigos', pathMatch: 'full', component: EnemigoListComponent },
  { path: 'escenarios', pathMatch: 'full', component: EscenarioListComponent },
  { path: 'documentacion', pathMatch: 'full', component: DocListComponent },

  // 👇 Rutas separadas para login y registro
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ⚠️ Admin cargado solo si es necesario (puede agregarse guard luego)
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-panel.component').then(m => m.AdminPanelComponent)
  },
  // {
  //   path: 'admin/:entidad/crear',
  //   loadComponent: () => import('./features/admin/crear/crear.component').then(m => m.CrearComponent)
  // },
  // {
  //   path: 'admin/imagenes/crear',
  //   loadComponent: () => import('./features/admin/crear-imagen/crear-imagen.component').then(m => m.CrearImagenComponent)
  // },

  { path: '**', redirectTo: '' }
];
