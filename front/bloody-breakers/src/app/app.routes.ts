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
    path: 'galeria',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/galeria/galeria.component').then(m => m.GaleriaComponent)
  }
  ,
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
      },
      {
        path: 'mundos/delete',
        loadComponent: () =>
          import('./features/admin/mundos/delete-mundo.component').then(m => m.DeleteMundoComponent)
      },
      {
        path: 'personajes/delete',
        loadComponent: () =>
          import('./features/admin/personajes/delete-personaje.component').then(m => m.DeletePersonajeComponent)
      },
      {
        path: 'habilidades/delete',
        loadComponent: () =>
          import('./features/admin/habilidades/delete-habilidad.component').then(m => m.DeleteHabilidadComponent)
      },
      {
        path: 'escenarios/delete',
        loadComponent: () =>
          import('./features/admin/escenarios/delete-escenario.component').then(m => m.DeleteEscenarioComponent)
      },
      {
        path: 'imagenes/delete',
        loadComponent: () =>
          import('./features/admin/imagenes/delete-imagen.component').then(m => m.DeleteImagenComponent)
      },
      {
        path: 'mundos/update',
        loadComponent: () =>
          import('./features/admin/mundos/update-mundo.component').then(m => m.UpdateMundoComponent)
      },
      {
        path: 'personajes/update',
        loadComponent: () =>
          import('./features/admin/personajes/update-personaje.component').then(m => m.UpdatePersonajeComponent)
      },
      {
        path: 'habilidades/update',
        loadComponent: () =>
          import('./features/admin/habilidades/update-habilidad.component').then(m => m.UpdateHabilidadComponent)
      },
      {
        path: 'escenarios/update',
        loadComponent: () =>
          import('./features/admin/escenarios/update-escenario.component').then(m => m.UpdateEscenarioComponent)
      },
      {
        path: 'imagenes/update',
        loadComponent: () =>
          import('./features/admin/imagenes/update-imagen.component').then(m => m.UpdateImagenComponent)
      }




    ]
  }

  ,
  {
    path: '**',
    redirectTo: '',
  }
];
