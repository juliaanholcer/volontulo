import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrganizationService } from './organization.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html'
})
export class OrganizationDetailsComponent implements OnInit {

  organization$: Observable<Organization>;
  djangoRoot: string = environment.djangoRoot;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.organization$ = this.activatedRoute.params
      .switchMap(params => this.organizationService.getOrganization(params.organizationId));
  }

}
