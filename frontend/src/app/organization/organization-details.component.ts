import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'volontulo-organization-details',
  templateUrl: './organization-details.component.html'
})
export class OrganizationDetailsComponent implements OnInit {

  urlParams: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.urlParams = this.activatedRoute.params;
  }

}
