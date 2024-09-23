import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarexercicioPage } from './criarexercicio.page';

const routes: Routes = [
  {
    path: '',
    component: CriarexercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarexercicioPageRoutingModule {}
