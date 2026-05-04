import { Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { filmResolver } from './resolvers/film.resolver';
import { NotFoundComponent } from './components/not-found.component/not-found.component';
import { Film } from './types/film';

export const routes: Routes = [
  {
    path: 'films',
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: FilmListComponent,
        title: 'Film Catalog',
      },
      {
        path: ':id',
        component: FilmDetailsComponent,
        title: 'Film Details',
        resolve: { film: filmResolver },
        data: { breadcrumb: (data: { film?: Film }) => data.film?.title ?? 'Film Details' },
      },
    ],
  },

  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  { path: '404', component: NotFoundComponent, title: 'Not Found' },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
