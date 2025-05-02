import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  private router = inject(Router);

  logout() {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }
}
