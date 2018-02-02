import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { User } from './user.d';

@Injectable()
export class AuthService {
  private _loginUrl = `${environment.apiRoot}/login`;
  private _logoutUrl = `${environment.apiRoot}/logout`;
  private _currentUserUrl = `${environment.apiRoot}/current-user`;
  private _passwordResetUrl = `${environment.apiRoot}/password-reset`;
  private _currentUser: User;
  public changeUserEvent: BehaviorSubject<User | null>;

  public user$: Observable<User | null>;

  constructor(
    private http: Http,
    private router: Router,
  ) {
    this.changeUserEvent = new BehaviorSubject(null);
    this.user$ = this.changeUserEvent.asObservable();

    this.http.get(this._currentUserUrl, { withCredentials: true })
      .subscribe(rsp => {
        this._currentUser = (rsp.text() === '' ? null : rsp.json());
        this.changeUserEvent.next(this._currentUser);
      });
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post(
      this._loginUrl,
      { username, password },
      { withCredentials: true })
      .map(rsp => {
        const backendUser = rsp.json();
        if (this._currentUser !== backendUser) {
          this._currentUser = backendUser;
          this.changeUserEvent.next(this._currentUser);
          this.router.navigate(['']);
          return this._currentUser;
        }
      });
  }
  resetPassword(email: string) {
    return this.http.post(
      this._passwordResetUrl, email)
      .map(response => {
        if (response.status === 201) {
          return 'success';
        }
      }).catch(err => Observable.of('error'));
  }

  confirmResetPassword(uid:string, token:string) {
    return uid + '' + token;
  }

  currentUser(): User {
    return this._currentUser;
  }

}
