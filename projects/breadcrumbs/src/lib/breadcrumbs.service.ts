import { Injectable, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router
} from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  @Input() homeLink: string = '/';
  private breadcrumbs$ = new ReplaySubject<Breadcrumb[]>(1);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => route.snapshot.root)
      )
      .subscribe((router) =>
        this.breadcrumbs$.next(
          build(router, { label: 'Главная', link: this.homeLink })
        )
      );
  }

  public get(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$.asObservable();
  }

  navigate(item: Breadcrumb) {
    this.router.navigateByUrl(item.link);
  }
}

const build = (
  router: ActivatedRouteSnapshot,
  starter?: Breadcrumb
) => {
  let breadcrumbs = starter ? [starter] : [];
  let route: ActivatedRouteSnapshot | null = router;
  while (route) {
    if (route.data) {
      let b: BreadcrumbsConfig = route.data.breadcrumbs;
      if (b)
        breadcrumbs.push({
          label: b.label(route.data),
          link: url(route),
        });
    }
    route = route.firstChild;
  }
  return breadcrumbs;
};

const url = (route: ActivatedRouteSnapshot) =>
  route.pathFromRoot.map(segment).join('/');
const segment = (part: ActivatedRouteSnapshot) =>
  part.url.map((url) => url.path).join('/');

export interface BreadcrumbsConfig {
  label: (data?: Data) => string;
}

export interface Breadcrumb {
  label: string;
  link: string;
}
