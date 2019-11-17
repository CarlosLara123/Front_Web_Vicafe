import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovicafeRoutingModule } from './covicafe-routing.module';
import { CovicafeComponent } from './covicafe.component';

@NgModule({
  declarations: [CovicafeComponent],
  imports: [
    CommonModule,
    CovicafeRoutingModule
  ]
})
export class CovicafeModule { }
