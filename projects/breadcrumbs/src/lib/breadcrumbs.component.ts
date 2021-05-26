import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbsService } from './breadcrumbs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent {

  breadcrumbs$: Observable<Breadcrumb[]>;
  constructor(private readonly service: BreadcrumbsService) {
    this.breadcrumbs$ = service.get();
  }

  navigate(item: Breadcrumb){
    this.service.navigate(item);
  }

}
