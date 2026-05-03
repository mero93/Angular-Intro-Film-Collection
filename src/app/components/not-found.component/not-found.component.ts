import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found.component',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  readonly counter = signal(0);
  private readonly target = 404;
  private readonly duration = 1500;

  ngOnInit(): void {
    this.animateCount();
  }

  private animateCount() {
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      const easeOut = progress * (2 - progress);
      const currentValue = Math.floor(easeOut * this.target);

      this.counter.set(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}
