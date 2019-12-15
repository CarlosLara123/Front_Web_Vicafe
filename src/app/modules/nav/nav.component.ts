import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global.service';

declare var $:any;
declare var responsiveNav:any; 
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [UserService]
})
export class NavComponent implements OnInit {
  public token;
  public identity;
  public url;

  constructor(private _userService: UserService, private _router: Router) {
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }
  
  ngOnInit() {
  }

  public singOut() {
    sessionStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
    setTimeout(() => {
      window.location.reload()
    }, 10);
  }

}
