import { Component, inject } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  private readonly breadcrumbsService = inject(BreadcrumbsService);
  readonly breadcrumbs = this.breadcrumbsService.breadcrumbs;
}
