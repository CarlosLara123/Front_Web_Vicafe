import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  
  public token;
  public identity;
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public getIdentity() {
    var identity2 = JSON.parse(sessionStorage.getItem('identity'))

    if (identity2 != null) {
      this.identity = identity2
    } else {
      this.identity = null;
    }

    return this.identity
  }

  public getToken() {
    var token2 = sessionStorage.getItem('token');

    if (token2 != null) {
      this.token = token2
    } else {
      this.token = null;
    }

    return this.token
  }


  public login(user, gettoken2 = null): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json')
    if (gettoken2 != null) {
      user.gettoken = gettoken2;
    }else{

    }
    let params = JSON.stringify(user);

    return this._http.post(this.url +'/login', params, { headers: headers })
  }
}
