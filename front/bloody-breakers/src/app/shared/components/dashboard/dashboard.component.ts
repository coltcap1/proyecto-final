import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);

  logout():void{
    this.loginService.logout();
  }

  // ✅ signals reactivas del LoginService
  isLoggedIn = this.loginService.isLoggedIn;
  isAdmin = this.loginService.isAdmin;

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
