import { Component, inject, signal } from '@angular/core';
import { LoginService } from './core/services/login.service';
import { HomeComponent } from './features/inicio/home.component';
import { MundoListComponent } from './features/mundo/mundo-list.component';
import { EscenarioListComponent } from './features/escenarios/escenario-list.component';
import { PersonajeListComponent } from './features/personajes/personaje-list.component';
import { EnemigoListComponent } from './features/enemigos/enemigo-list.component';
import { LoginComponent } from './features/login/login.component';
import { DocListComponent } from './features/documentacion/doc-list.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent,
    MundoListComponent,
    EscenarioListComponent,
    PersonajeListComponent,
    EnemigoListComponent,
    LoginComponent,
    DocListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloody-breakers';

  isLoggedIn = signal(this.checkLogged());
  isAdmin = signal(this.checkAdmin());

  private checkLogged(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  private checkAdmin(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  onLoginSuccess() {
    this.isLoggedIn.set(true);
    this.isAdmin.set(this.checkAdmin());
  }


}
