import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from "rxjs/operators";
import { pipe } from "rxjs/util/pipe";
import { AuthService } from "../auth.service";
import { Organization } from '../organization/organization.model';

@Component({
  selector: 'volontulo-account',
  templateUrl: './account.component.html',
})

export class AccountComponent implements OnInit {
  organizations$: Observable<any>;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.organizations$ = this.authService.user$
      .pipe(
        map(user => {
          console.log(user.organizations)
          return user.organizations
        })
      );
  }
}
