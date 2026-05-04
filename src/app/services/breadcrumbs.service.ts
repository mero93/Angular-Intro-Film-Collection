import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    let currentRoute: ActivatedRoute | null = this.router.routerState.root;
    let url = '';

    while (currentRoute) {
      const snapshot = currentRoute.snapshot;
      const path = currentRoute.snapshot.url.map((segment) => segment.path).join('/');
      if (path) {
        url += `/${path}`;
      }

      const breadcrumbData = snapshot.data['breadcrumb'];

      const label =
        typeof breadcrumbData === 'function'
          ? breadcrumbData(snapshot.data)
          : (breadcrumbData ?? snapshot.title);

      const currentUrl = url || '/';

      if (label && !breadcrumbs.some((b) => b.url === currentUrl)) {
        breadcrumbs.push({ label, url: currentUrl });
      }

      currentRoute = currentRoute.firstChild;
    }

    this.breadcrumbs.set(breadcrumbs);
  }
}
