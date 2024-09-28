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
  public todosExercicios: any[] = []; // Novo array para armazenar todos os exercícios
  public diaSelecionado: string = '';
  public exerciciosDoDia: any[] = [];

  aluno: Aluno = {
    nome: '',
    email: '',
    peso: 0,
    altura: 0,
    dataNascimento: new Date(),
    // objetivo: '',
    diasTreino: [],
  };

  constructor(
    private alunoService: AlunoService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.getUserId(); // Chama a função para obter o ID do usuário no início

    // this.userData.exercicios;
  }
  onDayChange() {
    if (this.diaSelecionado && this.userData.exercicios) {
      // Atualiza os exercícios do dia selecionado
      this.exerciciosDoDia =
        this.userData.exercicios[this.diaSelecionado] || [];

      console.log('Exercícios para o dia selecionado:', this.exerciciosDoDia); // Para depuração
    } else {
      this.exerciciosDoDia = []; // Limpa a lista se não houver um dia selecionado válido
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
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          // console.log('Usuário logado:', user.uid);
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

  async getUserData() {
    if (this.userId) {
      this.alunoService.getAlunoById(this.userId).subscribe(
        (data: any) => {
          // Usando any, você perde a verificação de tipo
          console.log('Dados recebidos da API:', data);

          // Verifica se data.data e a chave 'exercicios' estão definidos
          if (data.data && data.data.exercicios) {
            this.userData = data.data; // Atribui os dados recebidos a userData
            // console.log('Informações do usuário:', this.userData);

            // const diasDaSemana = Object.keys(this.userData.exercicios);
            // console.log('Dias da semana disponíveis:', diasDaSemana);

            this.onDayChange();
          } else {
            console.error('A chave "exercicios" não está definida em userData');
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
