import { Directive, Input, HostListener, inject } from '@angular/core';
import { ScrollNavigatorService } from '../../core/services/scroll-navigator.service';

@Directive({
  selector: '[appScrollSection]',
  standalone: true
})
export class ScrollSectionDirective {
  private scrollNav = inject(ScrollNavigatorService);

  @Input('appScrollSection') path!: string;

  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const nearBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const nearTop = scrollTop <= 10;

    const goingDown = scrollTop > this.lastScrollTop;
    const goingUp = scrollTop < this.lastScrollTop;

    this.lastScrollTop = scrollTop;

    if (nearBottom && goingDown) {
      this.scrollNav.goToRelative(this.path, 'next');
    }

    if (nearTop && goingUp) {
      this.scrollNav.goToRelative(this.path, 'prev');
    }
  }
}
