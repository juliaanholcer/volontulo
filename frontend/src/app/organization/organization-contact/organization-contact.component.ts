import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationContactPayload } from '../organization.model';

@Component({
  selector: 'volontulo-organization-contact',
  templateUrl: './organization-contact.component.html',
  styleUrls: ['./organization-contact.component.css']
})
export class OrganizationContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm: NgForm;
  @Output() contact = new EventEmitter<OrganizationContactPayload>();
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    this.contact.emit({
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone_no: this.contactForm.value.phone_no,
      message: this.contactForm.value.message,
    });
  }
}
