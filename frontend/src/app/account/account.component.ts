import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

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
        map(user => user.organizations)
      );
  }
}
