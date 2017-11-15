import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class OrganizationService {
  url = `${environment.apiRoot}/organizations`;
  requestOptions = { withCredentials: true };

  constructor(private http: Http) {
  }

  getOrganization(id: number): Observable<Organization> {
    return this.http.get(`${this.url}/${id}`, this.requestOptions).map(response => response.json());
  }
}
