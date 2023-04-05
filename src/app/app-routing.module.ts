import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GiphyManagementComponent} from "../../libs/giphy/src/lib/pages/giphy-management/giphy-management.component";

const routes: Routes = [
  {
    path: '',
    component: GiphyManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
