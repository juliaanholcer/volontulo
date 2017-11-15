import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { OrganizationService } from "./organization.service";

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html'
})
export class OrganizationDetailsComponent implements OnInit {

  urlParams: Observable<any>;
  organization$: Observable<Organization>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    this.organization$ = this.activatedRoute.params
      .switchMap(params => this.organizationService.getOrganization(params.organizationId));
  }

}
