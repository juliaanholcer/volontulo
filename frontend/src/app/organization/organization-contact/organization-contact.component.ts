import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'volontulo-organization-contact',
  templateUrl: './organization-contact.component.html',
  styleUrls: ['./organization-contact.component.css']
})
export class OrganizationContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm: NgForm;
  @Output() contact = new EventEmitter<NgForm>();
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    this.contact.emit(this.contactForm);
  }
}
