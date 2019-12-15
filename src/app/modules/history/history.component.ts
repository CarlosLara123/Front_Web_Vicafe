import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HistoryService } from 'src/app/services/history.service';
import { UploadService } from 'src/app/services/upload.service';
import { History } from 'src/app/models/history.model';
import Swal from 'sweetalert2';
import { GLOBAL } from 'src/app/services/global.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [UserService, HistoryService, UploadService]
})
export class HistoryComponent implements OnInit {
  public history;
  public historyList;
  public historySelected;
  public color;
  public token;
  public identity;
  public url;
  public logged;
  public notHistory;
  public viewHistory;

  constructor(
    private _historyService: HistoryService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.color = this.color;
    this.history = new History('','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.logged = false;
    this.viewHistory = false;
    this.notHistory = 'No hay ningun dato en la historia'
  }

  ngOnInit() {
    this.getAllHistories()
    if(this.historyList){
      for (let i = 0; i < this.historyList.length; i++) {
        this.color = Math.floor(Math.random()*16777215).toString(16)
        console.log(this.color)
      }
    }
  }

  public getAllHistories(){
    this._historyService.getAllHistory().subscribe(
      response => {
          this.historyList = response.result;
          this.viewHistory = false;
          console.log(this.historyList)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: error.error.message,
            type: 'error'
          })
        }
      }
    )
  }

  public newHistory(){
    this._historyService.newHistory(this.token, this.history).subscribe(
      response => {
        if(response.result){
          this.history = response.result
          console.log(this.history)
          console.log(response.result)
          this.getAllHistories()
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: error.message,
            type: 'error'
          })
        }
      }
    )
  }


}
