import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinirExerciciosPage } from './definirexercicios.page'; // Corrigido


const routes: Routes = [
  {
    path: '',
    component: DefinirExerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinirexerciciosPageRoutingModule {}
