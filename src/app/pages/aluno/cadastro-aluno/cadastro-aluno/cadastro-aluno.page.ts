import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.page.html',
  styleUrls: ['./cadastro-aluno.page.scss'],
})
export class CadastroAlunoPage implements OnInit {

  userData: any = {
    id: '',
    nome: '',
    email: '',
    peso: 0,
    objetivo: '',
    diatreino: []
  };

  public screen: any = 'nome'

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alunoService: AlunoService
  ) { }

  ngOnInit() {
    ''
  }

  next(screen: string) {
    this.screen = screen;
  }

  prev(screen: string) {
    this.screen = screen;
  }

  // cadastrarAluno() {
  //   console.log(this.userData)
  //   // Aqui você pode enviar os dados coletados para o serviço de backend
  //   this.afAuth.authState.subscribe(user => {
  //     if(user) {
  //       console.log(user)
  //       this.userData.id = user.uid;
  //       this.userData.email = user.email || '';

  //       // Agora, envia os dados para o serviço de backend
  //       this.alunoService.cadastrarAluno(this.userData).subscribe(
  //         response => {
  //           console.log('Aluno cadastrado com sucesso!', response);
  //           // Redirecionar para a página inicial ou outra página
  //           this.router.navigate(['/aluno']);
  //         },
  //         error => {
  //           console.error('Erro ao cadastrar aluno', error);
  //         }
  //       );

  //     };
  //   })
  // }
  async cadastrarAluno() {
    try {
      const user = await this.afAuth.currentUser;
  
      if (user) {
        console.log(user);
        this.userData.id = user.uid;
        this.userData.email = user.email || '';
  
        // Agora, envia os dados para o serviço de backend
        this.alunoService.cadastrarAluno(this.userData).subscribe(
          response => {
            console.log('Aluno cadastrado com sucesso!', response);
            this.router.navigate(['/aluno']);
          },
          error => {
            console.error('Erro ao cadastrar aluno', error);
          }
        );
      } else {
        console.error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
    }
  }
  
  

}
