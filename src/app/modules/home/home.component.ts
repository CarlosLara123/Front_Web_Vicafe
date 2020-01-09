import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { GLOBAL } from 'src/app/services/global.service';
import { PublicationService } from 'src/app/services/publication.service';
import { FarmerService } from 'src/app/services/farmers.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { Farmer } from 'src/app/models/farmer.model';
import { Publication } from 'src/app/models/publiction.model';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PublicationService, FarmerService,
    UserService, UploadService]
})
export class HomeComponent implements OnInit {

  public publicationlist;
  public publicationSelected;
  public publication: Publication;
  public farmerlist;
  public farmerSelected;
  public farmer: Farmer;
  public identity;
  public token;
  public url;
  public notPost;
  public notFarmer;
  public viewPost;
  public viewFarmer;
  public logged;

  constructor(
    private _publicationService: PublicationService,
    private _farmerService: FarmerService, 
    private _userService: UserService, 
    private _uploadService: UploadService) {
      this.publication = new Publication('', '', '', '', '');
      this.publicationSelected = new Publication('', '', '', '', '');
      this.farmer = new Farmer('','', '', '', '','','');
      this.farmerSelected = new Farmer('','', '', '', '','','');
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.logged = false;
      this.viewPost = true;
      this.viewFarmer = true;
      this.notPost = 'No hay ninguna publicacion';
      this.notPost = 'No hay ningun socio registrado'
  }

  ngOnInit() {
    this.getAllPost()
    this.getAllFarmer()
    if (this.identity) {
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

public functionModalPost(){

}

public functionModalFarmer(){
  
}
  public getAllPost() {
    this._publicationService.getAllPost().subscribe(
      response => {
        this.publicationlist = response.Publications;
        // if (this.publicationlist.length == 0) {
        //   this.viewPost = false;
        // }
        console.log(this.publicationlist)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: 'Algo salio mal',
            type: 'error'
          })
        }
      }
    )
  }

  public getAllFarmer() {
    this._farmerService.getAllfarmer().subscribe(
      response => {
        this.farmerlist = response.farmers;
        if (this.farmerlist.length == 0) {
          this.viewFarmer = false;
        }
        console.log(this.farmerlist)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: 'Algo salio mal',
            type: 'error'
          })
        }
      }
    )
  }

  public newPost() {
    this._publicationService.newPost(this.token, this.publication).subscribe(
      response => {
        this.publication = response.newPublication;
        console.log(this.publication);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        console.log(this.publication)
        if (errorMessage != null) {
          Toast.fire({
            text: error.message,
            type: 'error'
          })
        }
      }
    )
  }

  public newFarmer() {
    this._farmerService.newfarmer(this.token, this.farmer).subscribe(
      response => {
        this.farmer = response.farmer;
        console.log(this.farmer);
        this.getAllFarmer();
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

  public getOnePost(id) {
    this._publicationService.getOnePost(this.token, id).subscribe(
      response => {
        this.publicationSelected = response.Publication;
        console.log(this.publicationSelected)
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

  public getOneFarmer(id){
    this._farmerService.getOnefarmer(this.token, id).subscribe(
      response => {
        this.farmerSelected = response.farmer;
        console.log(this.farmerSelected)
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

  public deleteOnePost(id) {
    this._publicationService.deleteOnePost(this.token, id).subscribe(
      response => {
        Toast.fire({
          text: response.message,
          type: 'success'
        })
        this.getAllPost();
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

  public deleteOneFarmer(id){
   this._farmerService.deleteOnefarmer(this.token, id).subscribe(
     response =>{
      Toast.fire({
        text: response.message,
        type: 'success'
      })
      this.getAllFarmer()
     },
     error =>{
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

  public updateOnePost(id) {
    this._publicationService.updatePost(id,this.publicationSelected).subscribe(      
      response => {
        console.log(this.publicationSelected)
        console.log(response.publication)
        if(!response.publication){
          Toast.fire({
            text : response.message,
            type : 'error'
            
          })
        }else{
          if(this.subirImege){
            sessionStorage.setItem('identity', JSON.stringify(this.publicationSelected.toString()));
            this.identity = this.publicationSelected;
            //SUBIR LA IMAGEN
            this._uploadService.makeFileRequest(this.url+'/upload-image-publication/'+id, [],this.filesToUpload, this.token, 'image')
            .then((result: any)=>{
              console.log(result);
              this.publicationSelected.image = result.publication.image;
              sessionStorage.setItem('identity', JSON.stringify(this.publicationSelected.toString()));
              this.getAllPost()
              Toast.fire({
                text : response.message,
                type : 'success'    
              })

              // this._router.navigate(['/home']);
            }); 
          }else{

          }          
        }
        this.getAllPost()
      },
      error => {        
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          Toast.fire({
            text : error.error.message,
            type : 'error'
  
          })
        }
      }
    )
  }

  public setImagePost(id) {
    this._publicationService.updatePost(id, this.publication).subscribe(
      response => {
        if(!response.publication){
          console.log('No traigo nada')
        }else{
          if (this.subirImege == true) {
            console.log(this.filesToUpload, 'input image')
            this._uploadService.makeFileRequest(this.url + '/upload-image-publication/' + id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                console.log('estoy dentro de la promesa', result.publication.image)
                this.publication.image = result.publication.image;
                this.getAllPost();
                if (result.publication) {
                  Toast.fire({
                    text: 'Publicación creada exitosamente',
                    type: 'success'
                  })
                } else {
                  Toast.fire({
                    text: 'No se pudo crear la publicón',
                    type: 'error'
                  })
                  this.deleteOnePost(this.publication._id)
                }
              }).catch(err => console.log(err));
          } else {
            Toast.fire({
              text: 'No se pudo crear la publicón',
              type: 'error'
            })
            this.deleteOnePost(this.publication._id)
          }
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: 'No se pudo crear la publicón',
            type: 'error'
          })
          this.deleteOnePost(this.publication._id)
        }
      }
    )
  }

  public setImageFarmer(id) {
    this._farmerService.updatefarmer(id, this.farmer).subscribe(
      response => {
        if(!response.farmer){
          console.log('No traigo nada')
        }else{
          if (this.subirImege == true) {
            console.log(response.farmer.image)
            this._uploadService.makeFileRequest(this.url + '/upload-image-farmer/' + id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.farmer.image = result.farmer.image;
                this.getAllPost();
                if (result.farmer) {
                  Toast.fire({
                    text: 'Socio creado exitosamente',
                    type: 'success'
                  })
                } else {
                  Toast.fire({
                    text: 'No se pudo crear al socio',
                    type: 'error'
                  })
                  this.deleteOneFarmer(this.farmer._id)
                }
              });
          } else {
            Toast.fire({
              text: 'No se pudo crear al socio',
              type: 'error'
            })
            this.deleteOneFarmer(this.farmer._id)
          }
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          Toast.fire({
            text: 'No se pudo crear al socio',
            type: 'error'
          })
          this.deleteOneFarmer(this.farmer._id)
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
