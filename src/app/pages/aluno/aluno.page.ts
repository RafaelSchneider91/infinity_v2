import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Aluno } from 'src/app/models/aluno.model';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-usuario',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {


  public userData: any; // ou use um tipo mais específico se desejar
  public userId: string = '';

  aluno: Aluno = {
    nome: '',
    email: '',
    peso: 0,
    altura: 0,
    dataNascimento: new Date(),
    // objetivo: '',
    diasTreino: []
  };

  public diaSelecionado: string = '';
  public exerciciosDoDia: any[] = [];


  constructor(
    private alunoService: AlunoService,
    private authService: AuthService,
    private afAuth: AngularFireAuth, 
  ) {}

  ngOnInit() {
    this.getUserId(); // Chama a função para obter o ID do usuário no início
  }

  onDayChange() {
    if (this.diaSelecionado) {
      this.exerciciosDoDia = this.userData.exercicios[this.diaSelecionado]; // Atualiza os exercícios com base no dia selecionado
    }
  }

  cadastrarAluno() {
    this.alunoService.cadastrarAluno(this.aluno).subscribe(
      (response) => {
        console.log('Aluno cadastrado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao cadastrar aluno', error);
        // Lógica para tratar o erro
      }
    );
  }

  
  async getUserId(): Promise<void> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          console.log('Usuário logado:', user.uid);
          this.userId = user.uid; // Armazena o ID do usuário na propriedade
          this.getUserData(); // Chama para buscar os dados do usuário
          resolve();
        } else {
          console.log('Nenhum usuário logado');
          this.userId = ''; // Define como string vazia
          resolve();
        }
      });
    });
  }

  // async getUserData() {
  //   if (this.userId) {
  //     this.alunoService.getAlunoById(this.userId).subscribe(
  //       (data) => {
  //         this.userData = data;
  //         console.log('Informações do usuário:', this.userData);
  //       },
  //       (error) => {
  //         console.error('Erro ao buscar dados do usuário:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID do usuário não encontrado');
  //   }
  // }
  async getUserData() {
    if (this.userId) {
      this.alunoService.getAlunoById(this.userId).subscribe(
        (data) => {
          this.userData = data;
          console.log('Informações do usuário:', this.userData);
          
          // Verifique se userData está definido
          if (!this.userData) {
            console.error('userData está indefinido');
            return;
          }
  
          // Verifique se diatreino existe e é um array
          if (this.userData.diatreino && Array.isArray(this.userData.diatreino)) {
            if (this.userData.diatreino.length > 0) {
              this.diaSelecionado = this.userData.diatreino[0]; // Define o primeiro dia como padrão
              this.exerciciosDoDia = this.userData.exercicios[this.diaSelecionado] || []; // Preenche os exercícios do dia padrão
            } else {
              console.error('Diatreino está vazio');
            }
          } else {
            console.error('Diatreino não está definido ou não é um array');
          }
        },
        (error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado');
    }
  }
  
  
  
  

  
  
  
  
  


  async logout() {
    try {
      await this.authService.logout();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }
}



