import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { GLOBAL } from './global.service';
import { History } from '../models/history.model';


@Injectable()
export class HistoryService {
  public url;
  public token;
  public identity;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  public newHistory(token, history: History) : Observable<any>{
    let params = JSON.stringify(history);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.post( this.url + '/history/add', params, {headers : headers} );
  }

  public getAllHistory(page = null) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get( this.url + '/history/all/1', {headers : headers} );
  }

  public getOneHistory(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.get( this.url + '/history/' + id, {headers : headers} );
  }

  public deleteOneHistory(token, id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
    return this._http.delete( this.url + '/history/delete/' + id, {headers : headers} );
  }

  public updateOneHistory(id, history: History) : Observable<any>{
    let params = JSON.stringify(history);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put( this.url + '/history/update/' + id, params, {headers : headers} );
  }

}
