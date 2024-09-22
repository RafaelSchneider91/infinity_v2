import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoPage } from './aluno.page';

const routes: Routes = [
  {
    path: '',
    component: AlunoPage,
  },  {
    path: 'cadastro-aluno',
    loadChildren: () => import('./cadastro-aluno/cadastro-aluno/cadastro-aluno.module').then( m => m.CadastroAlunoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
