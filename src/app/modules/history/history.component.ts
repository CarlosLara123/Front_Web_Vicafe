import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public prueba = ['1', '2', '3', '4', '5']
  public color;
  constructor() {
    this.color = this.color;
   }

  ngOnInit() {
    for (let i = 0; i < this.prueba.length; i++) {
      this.color = Math.floor(Math.random()*16777215).toString(16)
      console.log(this.color)
    }
  }

}
