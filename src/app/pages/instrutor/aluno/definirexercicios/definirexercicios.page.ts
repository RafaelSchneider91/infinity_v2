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
  exercicioDia: any[] = []

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private instrutorService: InstrutorService
  ) {}

  ngOnInit() {
    // Obtém o alunoId e o dia da rota
    this.route.paramMap.subscribe(params => {
      this.dia = params.get('dia') || '';
      this.alunoId = params.get('alunoId') || '';
      
      if (this.alunoId && this.dia) {
        // Carregar os exercícios e depois buscar dados do aluno
        this.carregarExercicios();
      } else {
        console.error('Aluno ID ou dia não fornecido.');
      }
    });

    this.carregarExercicios();
  }

  // Carrega os exercícios e depois busca dados do aluno
  carregarExercicios() {
    this.instrutorService.listarExercicios().subscribe(
      (data) => {
        this.exercicios = data; // Armazena os exercícios recebidos
        // Depois de carregar os exercícios, busca os dados do aluno
        this.buscarDadosAluno(this.alunoId);
      },
      (error) => {
        console.error('Erro ao carregar exercícios:', error);
      }
    );
  }

  
  buscarDadosAluno(alunoId: string) {
    this.alunoService.getExerciciosPorDia(alunoId).subscribe(
      (response: any) => {
        this.alunoData = response.data;
  
        // Verifica se há exercícios para o dia específico
        if (this.alunoData?.exercicios && this.alunoData.exercicios[this.dia]) {
          const exerciciosDia = this.alunoData.exercicios[this.dia];
  
          // Marcar exercícios como selecionados, comparando apenas os IDs
          this.exercicios.forEach(exercicio => {
            // Compara se o ID do exercício está no array de exercícios do aluno para o dia
            exercicio.selecionado = exerciciosDia.some((exercicioDia: any) => exercicioDia.id === exercicio.id);
          });
        } else {
          // console.error(`Nenhum exercício encontrado para o dia: ${this.dia}`);
          this.exercicios; // Se não houver exercícios para o dia, deixa o array vazio
        }
      },
      (error) => {
        console.error('Erro ao buscar dados do aluno:', error);
      }
    );
  }
  


// Funcao para adicionar novos exercicios a um aluno
atualizarExercicio() {
  // Filtra os exercícios selecionados
  const exerciciosSelecionados = this.exercicios.filter(exercicio => exercicio.selecionado);
  console.log("Verifica os exercicios selecionados:", exerciciosSelecionados);
  const exerciciosDiaUsuario = this.alunoData.exercicios[this.dia] || [];
  // Verificação extra para garantir que o array selecionado não esteja vazio
  if (exerciciosSelecionados.length === 0 && exerciciosDiaUsuario.length === 0) {
    return;
  }

  // Verifica se o array exerciciosDiaUsuario está vazio ou null
  if (!exerciciosDiaUsuario || exerciciosDiaUsuario.length === 0) {
    // Chama o serviço para adicionar novos exercícios
    this.alunoService.adicionarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
        // window.location.reload();
      },
      (error) => {
        console.error('Erro ao adicionar exercícios:', error);
      }
    );
  } else if (exerciciosSelecionados.length < exerciciosDiaUsuario.length) {
    console.log('Número de exercícios selecionados é menor que os do usuário. Atualizando para a nova lista.');
    // Atualiza o JSON com os exercícios selecionados
    this.alunoService.atualizarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
        // window.location.reload();
      },
      (error) => {
        console.error('Erro ao atualizar exercícios:', error);
      }
    );
  } else if (exerciciosSelecionados.length > exerciciosDiaUsuario.length) {
    // Atualiza o JSON com os exercícios selecionados
    this.alunoService.atualizarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
        // console.log('Exercícios atualizados com sucesso:', response);
        // window.location.reload();
      },
      (error) => {
        console.error('Erro ao atualizar exercícios:', error);
      }
    );
  } else {
    console.log('O número de exercícios selecionados é igual ao do usuário. Nenhuma atualização necessária.');
  }
}












}


















