import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalharalunoPage } from './detalharaluno.page';

const routes: Routes = [
  {
    path: '',
    component: DetalharalunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalharalunoPageRoutingModule {}
