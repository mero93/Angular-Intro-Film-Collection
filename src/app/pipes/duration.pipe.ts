import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value <= 0 || !Number.isFinite(value)) return '0min';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours.toFixed(0)}h ${minutes.toFixed(0)}min`;
    } else if (hours > 0) {
      return `${hours.toFixed(0)}h`;
    } else {
      return `${minutes.toFixed(0)}min`;
    }
  }
}
