import { Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { FilmListComponent } from './components/film-list/film-list.component';

export const routes: Routes = [
  {
    path: 'films',
    component: FilmListComponent,
    title: 'Film Catalog',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'films/:id',
    component: FilmDetailsComponent,
    title: 'Film Details',
  },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: '**', redirectTo: '/films' },
];
