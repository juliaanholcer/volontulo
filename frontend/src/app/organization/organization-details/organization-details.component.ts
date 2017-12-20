import { Component, Input, OnInit } from '@angular/core';

import { Organization } from '../organization.model';

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
})

export class OrganizationDetailsComponent implements OnInit {
  @Input() djangoRoot: string;
  @Input() isUserOrgMember: boolean;
  @Input() organization: Organization;

  constructor() {}

  ngOnInit() {
  }
}
