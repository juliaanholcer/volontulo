import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { environment } from '../../environments/environment';

@Component({
  selector: 'volontulo-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  djangoRoot: string = environment.djangoRoot;
  isUserOrgMember$: Observable<boolean>;
  user$: Observable<User | null>;
  organization$: Observable<Organization>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.organization$ = this.organizationService.organization$;

    this.activatedRoute.params
      .switchMap(params => this.organizationService.getOrganization(params.organizationId)
    ).subscribe();

    this.isUserOrgMember$ = this.organization$
      .combineLatest(this.user$, (org, user) => {
        if (org === null || user === null) {
          return false;
        }
        return user.organizations.filter(organ => org.id === organ.id).length > 0;
      });
  }
}
