import { Routes } from '@angular/router';
import { HomeComponent } from './features/inicio/home.component';
import { MundoListComponent } from './features/mundo/mundo-list.component';
import { PersonajeListComponent } from './features/personajes/personaje-list.component';
import { EnemigoListComponent } from './features/enemigos/enemigo-list.component';
import { EscenarioListComponent } from './features/escenarios/escenario-list.component';
import { FooterComponent } from './features/footer/footer.component';
import { LoginComponent } from './features/login/login.component';
import { DocListComponent } from './features/documentacion/doc-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mundo', component: MundoListComponent },
  { path: 'personajes', component: PersonajeListComponent },
  { path: 'enemigos', component: EnemigoListComponent },
  { path: 'escenarios', component: EscenarioListComponent },
  { path: 'documentacion', component: DocListComponent },
  { path: 'login', component: LoginComponent },
  // Opcional: rutas protegidas
  { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./features/admin/admin-panel.component').then(m => m.AdminPanelComponent) },
  { path: '**', redirectTo: '' }
];
