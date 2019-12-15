import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farmer } from '../models/farmer.model';
import { UserService } from './user.service';
import { GLOBAL } from './global.service';

@Injectable()
export class FarmerService {

  public url;
  public token;
  public identity;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  public newfarmer(token, farmer: Farmer) : Observable<any>{
    let params = JSON.stringify(farmer);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.post( this.url + '/farmer/add', params, {headers : headers} );
  }

  public getAllfarmer(page = null) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get( this.url + '/farmer/all', {headers : headers} );
  }

  public getOnefarmer(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.get( this.url + '/farmer/' + id, {headers : headers} );
  }

  public deleteOnefarmer(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.delete( this.url + '/farmer/delete/' + id, {headers : headers} );
  }

  public updatefarmer(id, farmer: Farmer) : Observable<any>{
    let params = JSON.stringify(farmer);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put( this.url + '/farmer/update/' + id, params, {headers : headers} );
  }

}
