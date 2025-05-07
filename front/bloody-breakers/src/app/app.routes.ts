import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/inicio/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'mundos',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/mundo/mundo-list.component').then(m => m.MundoListComponent),
  },
  {
    path: 'personajes',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/personajes/personaje-list.component').then(m => m.PersonajeListComponent),
  },
  {
    path: 'enemigos',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/enemigos/enemigo-list.component').then(m => m.EnemigoListComponent),
  },
  {
    path: 'escenarios',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/escenarios/escenario-list.component').then(m => m.EscenarioListComponent),
  },
  {
    path: 'documentacion',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/documentacion/doc-list.component').then(m => m.DocListComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/admin/adminpanel/admin-panel.component').then(m => m.AdminPanelComponent),
    children: [
      {
        path: 'mundos/create',
        loadComponent: () =>
          import('./features/admin/mundos/create-mundo.component').then(m => m.CreateMundoComponent)
      },
      {
        path: 'personajes/create',
        loadComponent: () =>
          import('./features/admin/personajes/create-personaje.component').then(m => m.CreatePersonajeComponent)
      },
      {
        path: 'habilidades/create',
        loadComponent: () =>
          import('./features/admin/habilidades/create-habilidad.component').then(m => m.CreateHabilidadComponent)
      },
      {
        path: 'escenarios/create',
        loadComponent: () =>
          import('./features/admin/escenarios/create-escenario.component').then(m => m.CreateEscenarioComponent)
      },
      {
        path: 'imagenes/create',
        loadComponent: () =>
          import('./features/admin/imagenes/create-imagen.component').then(m => m.CreateImagenComponent)
      }


    ]
  }

  ,
  {
    path: '**',
    redirectTo: '',
  }
];
