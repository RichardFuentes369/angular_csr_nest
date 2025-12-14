import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumbs(root, breadcrumbs);
      this.breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumbs(route: ActivatedRouteSnapshot, breadcrumbs: Breadcrumb[], url: string = '') {

    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      const routeURL: string = child.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.data['breadcrumb']) {
        const breadcrumb: Breadcrumb = {
          label: child.data['breadcrumb'],
          url: url,
        };
        breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumbs(child, breadcrumbs, url);
    }
  }
}
