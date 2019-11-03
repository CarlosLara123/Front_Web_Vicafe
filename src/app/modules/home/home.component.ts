import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name : string
  constructor() {
    this.name="Carlos Lara"
   }

  ngOnInit() {
  }

  info(){
    Swal.fire({
      title: '<strong><u>Info de socio</u></strong>',
      html: '<form class="contact100-form validate-form">'+
      '<div class="input-group mb-3" style="margin-top: 5px">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-user"></i></span>'+
        '</div>'+
        '<input type="text" class="form-control" aria-label="-" placeholder="Nombre completo" style="border: none; border-bottom: 2px solid #3fa46a">'+
      '</div>'+
      '<div class="input-group mb-3" style="margin-top: 5px">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-mug-hot"></i></span>'+
        '</div>'+
        '<input type="text" class="form-control" aria-label="-" placeholder="Tasa" style="border: none; border-bottom: 2px solid #3fa46a">'+
      '</div>'+
      '<div class="input-group mb-3" style="margin-top: 5px">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><img src="https://img.icons8.com/ios-filled/50/000000/coffee-beans---v1.png" width="20" heigth="20"></span>'+
        '</div>'+
        '<textarea type="text" class="form-control" aria-label="-" placeholder="Variedades de cafe" style="border: none; border-bottom: 2px solid #3fa46a"></textarea>'+
      '</div>'+
      '<div class="input-group mb-3">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-map-marked-alt"></i></span>'+
        '</div>'+
        '<input type="text" class="form-control" aria-label="-" placeholder="Ubicacion" style="border: none; border-bottom: 2px solid #3fa46a">'+
      '</div>'+
      '<div class="input-group mb-3">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-mobile-alt"></i></span>'+
        '</div>'+
        '<input type="text" class="form-control" aria-label="-" placeholder="Contacto" style="border: none; border-bottom: 2px solid #3fa46a">'+
      '</div>'+
      '</form>',
    })
  }

  newPost(){
    Swal.fire({
      title: 'Nueva Publicación',
      html: '<form>'+
      '<div class="input-group mb-3" style="margin-top: 5px">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-font"></i></span>'+
        '</div>'+
        '<input type="text" class="form-control" aria-label="-" placeholder="Agrega un titulo" style="border: none; border-bottom: 2px solid #3fa46a">'+
      '</div>'+
      '<div class="input-group mb-3" style="margin-top: 5px">'+
        '<div class="input-group-prepend">'+
          '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="fas fa-file-word"></i></span>'+
        '</div>'+
        '<textarea type="text" class="form-control" aria-label="-" placeholder="Agrega una descripción" style="border: none; border-bottom: 2px solid #3fa46a"></textarea>'+
      '</div>'+
      '<div class="input-group mb-3">'+
        '<div class="input-group-prepend">'+
        '<span class="input-group-text" style="border: none; border-bottom: 2px solid #3fa46a"><i class="far fa-image"></i></span>'+
        '</div>'+
      '<div class="custom-file">'+
        '<input type="file" class="custom-file-input" id="inputGroupFile01">'+
        '<label class="custom-file-label" for="inputGroupFile01" style="border: none; border-bottom: 2px solid #3fa46a">Choose file</label>'+
      '</div>'+
      '</div>'+
      '</form>'
    })
  }
}
