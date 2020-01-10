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

declare var $: any;
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
    this.history = new History('','','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.logged = false;
    this.viewHistory = false;
    this.notHistory = 'No hay ningun dato en la historia'
  }

  ngOnInit() {
    this.getAllHistories()
    if(this.token){
      this.logged = true;
    }
    $(document).ready(function () {
      //Wizard
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
          return false;
        }
      });

      $(".next-step").click(function (e) {
        var $active = $('.nav-tabs li>.active');
        $active.parent().next().find('.nav-link').removeClass('disabled');
        nextTab($active);
      });

      $(".prev-step").click(function (e) {
        var $active = $('.nav-tabs li>a.active');
        prevTab($active);
      });
    });

    function nextTab(elem) {
      $(elem).parent().next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
      $(elem).parent().prev().find('a[data-toggle="tab"]').click();
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

  public getOneHistory(id){
    this._historyService.getOneHistory(this.token,id).subscribe(
      response => {
        if(response.result){
          this.historySelected = response.result;
          console.log(this.historySelected)
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

  public deleteOneHistory(id){
    this._historyService.deleteOneHistory(this.token,id).subscribe(
      response => {
        if(response.result){
          Toast.fire({
            text: response.message,
            type: 'success'
          })
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

  public setImageHistory(id) {
    this._historyService.updateOneHistory(id, this.history).subscribe(
      response => {
        if (this.subirImege == true) {
          this._uploadService.makeFileRequest(this.url + '/upload-image-history/' + id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.history.image = result.result.image;
              if (result.result) {
                Toast.fire({
                  text: 'Historia generada exitosamente',
                  type: 'success'
                })
              } else {
                Toast.fire({
                  text: 'No se pudo generar la historia',
                  type: 'error'
                })
              }
            });
        } else {
          Toast.fire({
            text: 'Historia generada exitosamente',
            type: 'success'
          })
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

  public filesToUpload: Array<File>;
  public subirImege = false;
  fileChangeEvent(fileInput: any) {
    this.subirImege = true;
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
