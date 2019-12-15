import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publiction.model';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { UserService } from './user.service';
import { GLOBAL } from './global.service';

@Injectable()
export class PublicationService {

  public url;
  public token;
  public identity;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  public newPost(token, publication: Publication) : Observable<any>{
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.post( this.url + '/publication/add', params, {headers : headers} );
  }

  public getAllPost(page = null) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get( this.url + '/publication/all', {headers : headers} );
  }

  public getOnePost(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.get( this.url + '/publication/' + id, {headers : headers} );
  }

  public deleteOnePost(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.delete( this.url + '/publication/delete/' + id, {headers : headers} );
  }

  public updatePost(id, publication: Publication) : Observable<any>{
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put( this.url + '/publication/update/' + id, params, {headers : headers} );
  }

}
