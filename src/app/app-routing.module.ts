import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  // {
  //   path: 'homeusuario',
  //   loadChildren: () =>
  //     import('./pages/homeusuario/homeusuario.module').then(
  //       (m) => m.HomeusuarioPageModule
  //     ),
  // },
  {
    path: 'instrutor',
    loadChildren: () =>
      import('./pages/instrutor/instrutor.module').then(
        (m) => m.InstrutorPageModule
      ),
  },
  {
    path: 'exercicios',
    loadChildren: () =>
      import('./pages/instrutor/exercicios/exercicios.module').then(
        (m) => m.ExerciciosPageModule
      ),
  },
  {
    path: 'criarexercicio',
    loadChildren: () =>
      import(
        './pages/instrutor/exercicios/criarexercicio/criarexercicio.module'
      ).then((m) => m.CriarexercicioPageModule),
  },
  {
    path: 'aluno',
    loadChildren: () =>
      import('./pages/aluno/aluno.module').then((m) => m.UsuarioPageModule),
  },

  {
    path: 'cadastro-aluno',
    loadChildren: () =>
      import(
        './pages/aluno/cadastro-aluno/cadastro-aluno/cadastro-aluno.module'
      ).then((m) => m.CadastroAlunoPageModule),
  },

  {
    path: 'detalhes-aluno/:id',
    loadChildren: () =>
      import('./pages/instrutor/aluno/detalharaluno/detalharaluno.module').then(
        (m) => m.DetalharalunoPageModule
      ),
  },
  {
    path: 'definir-exercicios',
    loadChildren: () =>
      import(
        './pages/instrutor/aluno/definirexercicios/definirexercicios-routing.module'
      ).then((m) => m.DefinirexerciciosPageRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
