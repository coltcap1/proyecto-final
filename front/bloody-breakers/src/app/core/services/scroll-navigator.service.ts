import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScrollNavigatorService {
  private router = inject(Router);

  private sectionOrder = [
    '/',
    '/mundos',
    '/personajes',
    '/enemigos',
    '/escenarios',
    '/documentacion'
  ];

  goToRelative(currentPath: string, direction: 'next' | 'prev') {
    const idx = this.sectionOrder.indexOf(currentPath);
    const nextIdx = direction === 'next' ? idx + 1 : idx - 1;
    const target = this.sectionOrder[nextIdx];

    if (target) {
      this.router.navigate([target]);
    }
  }
}
