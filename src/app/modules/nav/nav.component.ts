import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var responsiveNav:any; 
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public nav;
  constructor() {
  }
  
  ngOnInit() {
  }

}
