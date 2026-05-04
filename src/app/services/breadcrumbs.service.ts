import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private readonly router = inject(Router);

  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  constructor() {
    effect(() => {
      this.navigationEnd();
      this.updateBreadcrumbs();
    });
  }

  private updateBreadcrumbs() {
    const breadcrumbs: Breadcrumb[] = [];
    let currentRoute: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let url = '';

    while (currentRoute) {
      const path = currentRoute.url.map((segment) => segment.path).join('/');
      if (path) {
        url += `/${path}`;
      }

      const label = currentRoute.data['breadcrumb'] ?? currentRoute.title;

      if (label && !breadcrumbs.some((b) => b.label === label)) {
        breadcrumbs.push({ label, url: url || '/' });
      }

      currentRoute = currentRoute.firstChild;
    }

    this.breadcrumbs.set(breadcrumbs);
  }
}
