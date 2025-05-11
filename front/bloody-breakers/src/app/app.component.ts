import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloody-breakers';

  private router = inject(Router);

  isLoggedIn = signal(this.checkLogged());
  isAdmin = signal(this.checkAdmin());

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
