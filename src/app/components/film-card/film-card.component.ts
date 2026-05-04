import { Component, input, output } from '@angular/core';
import { Film } from '../../types/film';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css',
})
export class FilmCardComponent {
  film = input.required<Film>();
  toggleFavorite = output<number>();

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.film().id);
  }
}
