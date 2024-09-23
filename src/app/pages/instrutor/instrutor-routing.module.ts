import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrutorPage } from './instrutor.page';

const routes: Routes = [
  {
    path: '',
    component: InstrutorPage,
  },
  {
    path: 'exercicios',
    loadChildren: () =>
      import('./exercicios/exercicios.module').then(
        (m) => m.ExerciciosPageModule
      ),
  },
  {
    path: 'detalharaluno',
    loadChildren: () =>
      import('./detalharaluno/detalharaluno.module').then(
        (m) => m.DetalharalunoPageModule
      ),
  },  {
    path: 'definirexercicios',
    loadChildren: () => import('./aluno/definirexercicios/definirexercicios.module').then( m => m.DefinirexerciciosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrutorPageRoutingModule {}
