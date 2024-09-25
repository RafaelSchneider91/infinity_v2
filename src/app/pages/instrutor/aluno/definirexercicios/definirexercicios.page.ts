import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Exercicio } from '../../../../models/exercicio.model';
import { InstrutorService } from 'src/app/services/instrutor/instrutor.service';

@Component({
  selector: 'app-definir-exercicios',
  templateUrl: './definirexercicios.page.html',
  styleUrls: ['./definirexercicios.page.scss'],
})
export class DefinirExerciciosPage implements OnInit {
  alunoId: string = '';
  dia: string = '';
  alunoData: any;
  exercicios: any[] = []; 
  exerciciosusuario: any[] = []


  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private instrutorService: InstrutorService

  ) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.dia = params.get('dia') || '';
    this.alunoId = params.get('alunoId') || '';
    
    if (this.alunoId && this.dia) {
      this.buscarDadosAluno(this.alunoId);
    } else {
      console.error('Aluno ID ou dia não fornecido.');
    }
  });

  this.carregarExercicios();
}


// busca os dados aluno com base no id
buscarDadosAluno(alunoId: string) {
  this.alunoService.getExerciciosPorDia(alunoId).subscribe(
    (response: any) => { // Mantenha 'any' para a resposta
      this.alunoData = response.data; // Acesse 'data' diretamente

      // Verifique se 'exercicios' e o 'dia' existem
      if (this.alunoData?.exercicios && this.alunoData.exercicios[this.dia]) {
        const exerciciosDia = this.alunoData.exercicios[this.dia]; // Sem tipagem
        console.log('Exercícios para o dia:', exerciciosDia);

        // Marcar os exercícios já cadastrados
        this.exercicios.forEach((exercicio: any) => { // Use 'any' aqui
          exercicio.selecionado = exerciciosDia.some((e: any) => e.id === exercicio.id); // Use 'any' para 'e'
        });
      } else {
        console.error(`Nenhum exercício encontrado para o dia: ${this.dia}`);
      }
    },
    error => {
      console.error('Erro ao buscar dados do aluno:', error);
    }
  );
}

// Funcao para exibir os exercicios de um determinado aluno
carregarExercicios() {
  this.instrutorService.listarExercicios().subscribe(
    (data) => {
      this.exercicios = data; // Armazena os exercícios recebidos
      // console.log('Todos os exercícios:', this.exercicios);
      // Após carregar os exercícios, buscar os dados do aluno
      this.buscarDadosAluno(this.alunoId);
    },
    (error) => {
      console.error('Erro ao carregar exercícios:', error);
    }
  );
}

// Funcao para adicionar novos exercicios a um aluno
atualizarExercicio() {
  // Filtra os exercícios selecionados
  const exerciciosSelecionados = this.exercicios.filter(exercicio => exercicio.selecionado);
  
  const exerciciosDiaUsuario = this.alunoData.exercicios[this.dia];
  console.log('Exercicios do usuario do dia: ' + exerciciosDiaUsuario.id)

  if (exerciciosSelecionados.length > 0) {
      // Atualiza os exercícios
      console.log(this.exercicios)
      this.alunoService.adicionarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
          console.log('Exercícios atualizados com sucesso:', response);
      },
      (error) => {
          console.error('Erro ao atualizar exercícios:', error);
      }
      );
  } else {
      console.log('Nenhum exercício selecionado para atualizar.');
  }
}
















}
