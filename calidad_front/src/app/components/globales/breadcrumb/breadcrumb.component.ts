import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbService } from './service/breadcrumb.service';

@Component({
  selector: 'app-globales-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
