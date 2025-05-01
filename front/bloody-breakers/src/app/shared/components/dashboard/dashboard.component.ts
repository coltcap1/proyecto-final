import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private router = inject(Router);

  private jwt = signal(sessionStorage.getItem('jwt'));
  private role = signal(sessionStorage.getItem('role'));

  isLoggedIn = computed(() => !!this.jwt());
  isAdmin = computed(() => this.role() === 'ADMIN');

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
