import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationContactPayload } from '../organization.model';

@Component({
  selector: 'volontulo-organization-contact',
  templateUrl: './organization-contact.component.html',
  styleUrls: ['./organization-contact.component.css']
})
export class OrganizationContactComponent implements OnChanges {
  @ViewChild('contactForm') contactForm: NgForm;
  @Output() contact = new EventEmitter<OrganizationContactPayload>();
  @Input() contactStatus: string;
  submitDisabled = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contactStatus.currentValue === 'success') {
      this.contactForm.reset();
    }
    this.submitDisabled = false;
  }

  onSubmit() {
    this.contact.emit(this.contactForm.value as OrganizationContactPayload);
    this.submitDisabled = true;
  }
}
