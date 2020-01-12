import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url: string;
  constructor() { 
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name:string){
    return new Promise(function(resolve, reject){
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest;

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          console.log(xhr.response , "--antes del 200")
          if(xhr.status == 200){
            console.log(xhr.response)
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
            console.log(xhr.response)
          }
        }
      }

      xhr.open('POST',url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.send(formData);
    });
  }
}