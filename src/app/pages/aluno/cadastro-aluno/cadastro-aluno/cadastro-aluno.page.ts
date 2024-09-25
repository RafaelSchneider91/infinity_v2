import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ToastController } from '@ionic/angular';


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
    private alunoService: AlunoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    ''
  }

  next(screen: string) {
    // Validação de cada campo baseado na tela atual
    if (this.screen === 'nome' && !this.userData.nome) {
      this.presentToast('Por favor, digite seu nome.');
      return;
    }
    
    if (this.screen === 'peso' && !this.userData.peso) {
      this.presentToast('Por favor, digite seu peso.');
      return;
    }
    
    if (this.screen === 'objetivo' && !this.userData.objetivo) {
      this.presentToast('Por favor, selecione seu objetivo.');
      return;
    }
    
    if (this.screen === 'dias' && (!this.userData.diatreino || this.userData.diatreino.length === 0)) {
      this.presentToast('Por favor, selecione ao menos um dia de treino.');
      return;
    }
  
    // Se todas as validações passarem, mude a tela
    this.screen = screen;
  }
  
  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present();
  }

  prev(screen: string) {
    this.screen = screen;
  }


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
