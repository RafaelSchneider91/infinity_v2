import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrutorPage } from './instrutor.page';

const routes: Routes = [
  {
    path: '',
    component: InstrutorPage
  },  {
    path: 'exercicios',
    loadChildren: () => import('./exercicios/exercicios/exercicios.module').then( m => m.ExerciciosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrutorPageRoutingModule {}
