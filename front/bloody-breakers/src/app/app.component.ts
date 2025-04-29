import { Component, inject } from '@angular/core';
import { LoginService } from './core/services/login.service';
import { HomeComponent } from './features/inicio/home.component';
import { MundoListComponent } from './features/mundo/mundo-list.component';
import { EscenarioListComponent } from './features/escenarios/escenario-list.component';
import { PersonajeListComponent } from './features/personajes/personaje-list.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent,MundoListComponent,EscenarioListComponent,PersonajeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloody-breakers';

  // // Inyección moderna de Angular 19
  // loginService = inject(LoginService);

  // scrollToSection(sectionId: string) {
  //   document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  // }

  
}
