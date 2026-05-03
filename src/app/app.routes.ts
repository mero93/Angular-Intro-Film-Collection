import { Routes } from '@angular/router';

import { FilmDetailsComponent } from './components/film-details.component/film-details.component';
import { FilmListComponent } from './components/film-list.component/film-list.component';

export const routes: Routes = [
  {
    path: 'films',
    component: FilmListComponent,
    title: 'Catalog',
  },
  {
    path: 'films/:id',
    component: FilmDetailsComponent,
    title: 'Details',
  },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: '**', redirectTo: '/films' },
];
