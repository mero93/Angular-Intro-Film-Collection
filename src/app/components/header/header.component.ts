import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly isMenuOpen = signal(false);
  readonly navLinks: { path: string; label: string }[] = [
    { path: 'films', label: 'Films' },
    { path: 'about', label: 'About' },
  ];

  toggleMenu() {
    this.isMenuOpen.update((state) => !state);
  }
}
