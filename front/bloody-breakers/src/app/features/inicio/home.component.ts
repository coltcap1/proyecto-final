import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { ScrollSectionDirective } from '../../shared/directives/scroll-section.directive';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScrollSectionDirective,CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

/*
Hay codigo innecesario en el cambio de logo, se podria directamente obviar ya que hacer un cambio de route y listo.

HAY UN BUG QUE AL ESTAR AL 100% DE ZOOM, no funciona el cambio.
*/
  
  private router = inject(Router);
  scrollY = signal(0);
  staticLogoVisible = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    this.scrollY.set(scroll);

    const homeHeight = window.innerHeight * 2.5;
    const progreso = Math.min(scroll / (homeHeight * 0.6), 1);

    // Mostrar logo estático solo al final
    if (progreso >= 1) {
      this.router.navigate(['/mundos']);
    } else {
      this.staticLogoVisible.set(false);
    }
  }

  calcularTransformacion(): string {
    const y = this.scrollY();
    const homeHeight = window.innerHeight * 2.5;
    const progreso = Math.min(y / (homeHeight * 0.7), 1);

    const moveX = -50 - (progreso * 43);
    const moveY = -50 - (progreso * 39);
    const scale = 1 - (progreso * 0.5);

    return `translate(${moveX}%, ${moveY}%) scale(${scale})`;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }

  showStaticLogo() {
    return this.staticLogoVisible();
  }
}
