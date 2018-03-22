import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Organization } from '../organization.model';
import { OrganizationService } from "../organization.service";

@Component({
  selector: 'volontulo-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent implements OnInit {
  createForm: FormGroup;
  id: number;
  inEditMode: boolean = false;
  organization$: Observable<Organization>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.organization$ = this.organizationService.organization$;
    this.createForm = this.fb.group({
       'name': this.fb.control(null, Validators.required),
       'address': this.fb.control(null, Validators.required),
       'description': this.fb.control(null, Validators.required),
      });
    this.activatedRoute.params.subscribe(
      params => {
        if (params.organizationId) {
          this.inEditMode = true;
          this.id = params.organizationId;
          this.organizationService.getOrganization(params.organizationId);
        }
    });
  }
  onSubmit() {
    if (this.inEditMode) {
      this.organizationService.editOrganization(this.id, this.createForm.value)
        .subscribe();
    } else {
      this.organizationService.createOrganization(this.createForm.value)
        .subscribe();
    }
    //this.router.navigate(['/organizations', 'slug', this.id])
  }
  isFormInputInvalid(inputStringId: string): boolean {
    return this.createForm.get(inputStringId).invalid && this.createForm.get(inputStringId).touched;
  }
}
