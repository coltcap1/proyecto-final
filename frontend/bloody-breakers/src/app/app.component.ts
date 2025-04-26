import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './core/services/login.service';
import { HomeComponent } from './features/inicio/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HomeComponent],
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
