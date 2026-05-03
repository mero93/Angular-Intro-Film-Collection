import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs.component/breadcrumbs.component';
import { HeaderComponent } from './components/header.component/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BreadcrumbsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('film-collection');
}
