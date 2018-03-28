import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth.service';
import { Organization } from '../organization.model';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'volontulo-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  id: number;
  inEditMode = false;
  message = '';
  statusSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.createForm = this.fb.group({
       'name': this.fb.control(null, Validators.required),
       'address': this.fb.control(null, Validators.required),
       'description': this.fb.control(null, Validators.required),
      });

    this.activatedRoute.params
      .pipe(
        tap(params => {
          if (params.organizationId) {
            this.inEditMode = true;
            this.id = params.organizationId;
            this.organizationService.getOrganization(params.organizationId);
          }
        }),
        switchMap(() => this.organizationService.organization$)
      )
      .subscribe(
        (organization: Organization) => this.createForm.patchValue(organization)
      );

    this.statusSubscription = this.organizationService.createStatus$
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.authService.getCurrentUser();
            this.router.navigate(['/organizations', response.data.slug, response.data.id]);
          } else {
            this.message = response.data.detail;
          }
        });
  }

  onSubmit() {
    if (this.inEditMode) {
      this.organizationService.editOrganization(this.id, this.createForm.value);
    } else {
      this.organizationService.createOrganization(this.createForm.value);
    }
  }

  isFormInputInvalid(inputStringId: string): boolean {
    return this.createForm.get(inputStringId).invalid && this.createForm.get(inputStringId).touched;
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }
}
