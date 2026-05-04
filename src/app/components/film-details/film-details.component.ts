import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationPipe } from '../../pipes/duration.pipe';
import { Film } from '../../types/film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-film-details',
  imports: [CommonModule, DurationPipe],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css',
})
export class FilmDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly filmService = inject(FilmService);

  readonly film: Film = this.route.snapshot.data['film'];

  goBack(): void {
    this.router.navigate(['/films']);
  }

  onFavoriteClick(): void {
    console.log(this.film.isFavorite);
    this.filmService.toggleFavoriteStatus(this.film.id);
    this.film.isFavorite = !this.film.isFavorite;
  }
}
