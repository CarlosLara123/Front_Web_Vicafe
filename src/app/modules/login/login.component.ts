import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public user;
  public status;
  public token;
  public identity;

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User('','','','','','ROLE_1')
  }

  ngOnInit() {
  }

  public getToken(){
    this._userService.login(this.user, 'true').subscribe(
      response=>{
        this.token = JSON.stringify(response.token)
        if (this.token.length <= 0) {
          this.status = 'error'          
        }else{
          sessionStorage.setItem('token', this.token);
          this._router.navigate(['/']);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.table(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }
  public login(){
    this._userService.login(this.user).subscribe(
      response=>{
        this.identity = response.user;
        if(!this.identity){
          this.status = "error"
          Swal.fire({
            text: 'Usuario o contraseña incorrectos vuelva a intentarlo',
            type: 'error'
          })
        }else{
          sessionStorage.setItem('identity',JSON.stringify(this.identity));
          this.getToken();
          this.status = 'OK'
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}
