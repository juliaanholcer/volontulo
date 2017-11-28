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
  //currentUser: User;
  organization$: Observable<Organization>;
  djangoRoot: string = environment.djangoRoot;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    //private authService: AuthService,
  ) {
    //this.authService.changeUserEvent
    //  .subscribe(user => { this.currentUser = user; }
    //  );
    //this.currentUser = this.authService.currentUser();
  }

  ngOnInit() {
    //console.log(this.currentUser.username);
    this.organization$ = this.activatedRoute.params
      .switchMap(params => this.organizationService.getOrganization(params.organizationId));
  }
}
