import { Component, Input } from '@angular/core';

import { Organization } from '../organization.model';

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})

export class OrganizationDetailsComponent {
  @Input() djangoRoot: string;
  @Input() isUserOrgMember: boolean;
  @Input() organization: Organization;
}
