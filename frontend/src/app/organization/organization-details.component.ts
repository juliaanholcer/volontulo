import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrganizationService } from './organization.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
})
export class OrganizationDetailsComponent implements OnInit {
  currentUser: User;
  organization$: Observable<Organization>;
  djangoRoot: string = environment.djangoRoot;
  isUserOrgMember$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
  ) {
    this.authService.changeUserEvent
      .subscribe(user => { this.currentUser = user; }
      );
  }

  ngOnInit() {
    this.organization$ = this.activatedRoute.params
      .switchMap(params => this.organizationService.getOrganization(params.organizationId));
    this.isUserOrgMember$ = this.organization$
      .map(organization => this.currentUser.organizations
        .filter(org => org.id === organization.id).length > 0
      );
  }
}
