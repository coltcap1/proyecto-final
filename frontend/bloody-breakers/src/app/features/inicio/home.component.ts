import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

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
      this.staticLogoVisible.set(true);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showStaticLogo() {
    return this.staticLogoVisible();
  }
}
