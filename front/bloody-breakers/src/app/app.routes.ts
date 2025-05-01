import { Routes } from '@angular/router';
import { HomeComponent } from './features/inicio/home.component';
import { MundoListComponent } from './features/mundo/mundo-list.component';
import { PersonajeListComponent } from './features/personajes/personaje-list.component';
import { EnemigoListComponent } from './features/enemigos/enemigo-list.component';
import { EscenarioListComponent } from './features/escenarios/escenario-list.component';
import { FooterComponent } from './features/footer/footer.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DocListComponent } from './features/documentacion/doc-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mundos', component: MundoListComponent },
  { path: 'personajes', component: PersonajeListComponent },
  { path: 'enemigos', component: EnemigoListComponent },
  { path: 'escenarios', component: EscenarioListComponent },
  { path: 'documentacion', component: DocListComponent },

  // 👇 Rutas separadas para login y registro
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ⚠️ Admin cargado solo si es necesario (puede agregarse guard luego)
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-panel.component').then(m => m.AdminPanelComponent)
  },

  { path: '**', redirectTo: '' }
];
