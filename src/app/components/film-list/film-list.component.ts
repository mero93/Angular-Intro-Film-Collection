import { Component, inject, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilmCardComponent } from '../film-card/film-card.component';
import { AutofocusDirective } from '../../directives/autofocus.directive';

@Component({
  selector: 'app-film-list',
  imports: [CommonModule, FormsModule, FilmCardComponent, AutofocusDirective],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css',
})
export class FilmListComponent implements OnInit {
  private readonly filmService = inject(FilmService);
  public readonly films = this.filmService.filteredFilms;
  public searchTerm = this.filmService.searchFilter();

  ngOnInit(): void {
    this.filmService.loadFilms();
  }

  onSearchChange(value: string): void {
    this.filmService.searchFilter.set(value);
  }

  handleFavoriteToggle(id: number): void {
    this.filmService.toggleFavoriteStatus(id);
  }
}
