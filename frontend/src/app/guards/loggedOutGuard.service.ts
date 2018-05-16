import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean>   {
    return this.authService.getUser().pipe(
      tap(user => {
        if (user !== null) {
          this.router.navigate(['/']);
        }
      }),
      map(user => !user),
    )
  }
}
