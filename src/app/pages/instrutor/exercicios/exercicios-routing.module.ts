import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciciosPage } from './exercicios.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciciosPage,
  },
  {
    path: 'criarexercicio',
    loadChildren: () => import('./criarexercicio/criarexercicio.module').then( m => m.CriarexercicioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciciosPageRoutingModule {}
