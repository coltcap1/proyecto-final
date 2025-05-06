import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
