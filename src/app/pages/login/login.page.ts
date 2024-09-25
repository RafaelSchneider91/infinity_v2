import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';  // Importe o AlunoService


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public screen: any = 'signin';
  public email: string = '';

  private loading: any;
  public toast: any;
  public userLogin: User = { email: '', password: '', perfil: '' };
  public userRegister: User = { email: '', password: '', perfil: '' };

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alunoService: AlunoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    ('');
  }

  change(event: string) {
    this.screen = event;
  }

  
  async login() {
    await this.presentLoading();  // Inicia o loading antes do login
    try {
      // Chama o método de login do AuthService
      const userCredential = await this.authService.login(this.userLogin);
  
      // Obtém o UID do usuário logado
      const userId = userCredential.user?.uid;
  
      if (userId) {
        // Busca o aluno pelo ID (userId)
        const alunoData: any = await this.alunoService.getAlunoById(userId).toPromise();  // Usando 'any'
        // console.log(alunoData)

        if (alunoData) {
          const alunoPerfil = alunoData.data.perfil;  // Acessa perfil sem erro
          // const alunoCadastroObj = alunoData.data.objetivo

          // Redireciona de acordo com o perfil
          if (alunoPerfil === 'instrutor') {
            this.router.navigate(['/instrutor']);
          } else if (alunoPerfil === 'usuariofinal')  {
            this.router.navigate(['/aluno']);
          }            
          else {
            this.router.navigate(['/cadastro-aluno']);
          }
        } else {
          throw new Error('Dados do aluno não encontrados.');
        }
      } else {
        throw new Error('Erro ao obter ID do usuário.');
      }
      
    } catch (error: any) {
      // Exibe a mensagem de erro capturada no Toast
      console.error('Erro no login:', error);  // Verifica se o erro é capturado
      await this.presentToast(error.message || 'Erro desconhecido');
    } finally {
      // Remove o loading se ele estiver ativo
      if (this.loading) {
        this.loading.dismiss();
      }
    }
  }
  
  
  
  

  async register() {
    await this.presentLoading();  // Exibe o loading antes do processo de registro
  
    try {
      // Chama o método de registro do AuthService
      await this.authService.register(this.userRegister);  // Tenta registrar o usuário
      
      // Redireciona somente se o registro for bem-sucedido
      this.router.navigate(['/cadastro-aluno']);
    } catch (error: any) {
      // Exibe o erro no toast e interrompe o fluxo
      console.error('Erro no registro:', error);  // Verifica se o erro é capturado
      await this.presentToast(error.message || 'Erro desconhecido');
    } finally {
      // Finaliza o loading, independentemente de sucesso ou erro
      if (this.loading) {
        await this.loading.dismiss();
      }
    }
  }
  
  

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();
  }


  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'top',  // Opcional: garante que o toast apareça no topo da tela
      color: 'danger'   // Opcional: destaca o toast como um erro
    });
    toast.present();
  }
  

  // Função para chamar o serviço de redefinição de senha com async/await
  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.presentToast('Redefinição de senha enviada!');
    } catch (error: any) {
      this.presentToast(error.message || 'Erro desconhecido');
    }
  }
}
