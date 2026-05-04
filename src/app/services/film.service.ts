import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { Film } from '../types/film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private readonly http = inject(HttpClient);

  private readonly filmsPrivate = signal<Film[]>([]);
  public readonly searchFilter = signal<string>('');

  public readonly filteredFilms = computed(() => {
    const searchWords = this.searchFilter().trim().toLowerCase().split(/\s+/).filter(Boolean);

    if (!searchWords || searchWords.length === 0) return this.filmsPrivate();

    return this.filmsPrivate().filter((film) => {
      const title = film.title.toLowerCase();
      return searchWords.every((word) => title.includes(word));
    });
  });

  public readonly favoriteFilms = computed(() =>
    this.filmsPrivate().filter((film) => film.isFavorite),
  );

  public async loadFilms() {
    if (this.filmsPrivate().length > 0) return;

    const response = await fetch('./films.json');
    const data: Film[] = await response.json();
    this.filmsPrivate.set(data);

    return data;
  }

  public async loadById(id: number) {
    let films: Film[] = this.filmsPrivate();

    if (films.length === 0) {
      films = (await this.loadFilms()) ?? [];
    }

    return films.find((film) => film.id === id);
  }

  public async toggleFavoriteStatus(id: number) {
    console.log(this.filmsPrivate().length);
    if (this.filmsPrivate().length === 0) return;

    this.filmsPrivate.update((films) =>
      films.map((film) => (film.id === id ? { ...film, isFavorite: !film.isFavorite } : film)),
    );
  }
}
