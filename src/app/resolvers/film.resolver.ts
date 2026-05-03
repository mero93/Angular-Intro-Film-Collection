import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Film } from '../types/film';

export const filmResolver: ResolveFn<Film | undefined> = async (route) => {
  const filmService = inject(FilmService);
  const router = inject(Router);
  const filmId = Number(route.params['id']);

  const result = await filmService.loadById(filmId);

  if (!result) {
    router.navigate(['/404'], { skipLocationChange: true });
    return;
  }

  return result;
};
