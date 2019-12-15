import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class HistoryModule { }
