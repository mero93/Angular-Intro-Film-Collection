import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
})
export class ScrollToTopComponent {
  mountButton = signal(false);
  showButton = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const shouldShow = window.scrollY > 400;

    if (shouldShow) {
      this.mountButton.set(true);
      setTimeout(() => this.showButton.set(true), 10);
    } else {
      this.showButton.set(false);
      setTimeout(() => {
        if (!this.showButton()) this.mountButton.set(false);
      }, 400);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
