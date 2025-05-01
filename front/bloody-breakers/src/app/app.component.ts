import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloody-breakers';

  private router = inject(Router);

  staticLogoVisible = true;

  isLoggedIn = signal(this.checkLogged());
  isAdmin = signal(this.checkAdmin());

  constructor() {
    // ⬇️ Scroll automático al top al cambiar de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event:NavigationEnd) => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.staticLogoVisible = event.urlAfterRedirects === '/';
      });
  }

  private checkLogged(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  private checkAdmin(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  goHome():void{
    this.router.navigate(['/']);
  }

  onLoginSuccess() {
    this.isLoggedIn.set(true);
    this.isAdmin.set(this.checkAdmin());
  }
}
