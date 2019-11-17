import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovicafeComponent } from './covicafe.component';

const routes: Routes = [
  {
    path: '',
    component: CovicafeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovicafeRoutingModule { }
