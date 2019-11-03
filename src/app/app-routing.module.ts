import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '' , loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'home' , loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'login' , loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'history' , loadChildren: './modules/history/history.module#HistoryModule' },

  { path: '**' , loadChildren: './modules/home/home.module#HomeModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
