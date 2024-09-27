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

  // Busca os dados do aluno com base no ID
  // buscarDadosAluno(alunoId: string) {
  //   this.alunoService.getExerciciosPorDia(alunoId).subscribe(
  //     (response: any) => {
  //       this.alunoData = response.data;

  //       // Verifica se há exercícios e se o dia é válido
  //       if (this.alunoData?.exercicios && this.alunoData.exercicios[this.dia]) {
  //         const exerciciosDia = this.alunoData.exercicios[this.dia];
  //         // Marca os exercícios já cadastrados
  //         // this.marcarExerciciosSelecionados(exerciciosDia);
  //       } else {
  //         console.error(`Nenhum exercício encontrado para o dia: ${this.dia}`);
  //       }
  //     },
  //     (error) => {
  //       console.error('Erro ao buscar dados do aluno:', error);
  //     }
  //   );
  // }
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
// atualizarExercicio() {
//   // Filtra os exercícios selecionados
//   const exerciciosSelecionados = this.exercicios.filter(exercicio => exercicio.selecionado); // Filtra apenas os selecionados
//   console.log("Verifica os exercicios selecionados:", exerciciosSelecionados);

//   const exerciciosDiaUsuario = this.alunoData.exercicios[this.dia] || []; // Garante que exerciciosDiaUsuario seja um array válido
//   console.log('Exercicios do usuario do dia: ', exerciciosDiaUsuario);


//   console.log('Comprimento do array: ', exerciciosSelecionados.length)

//   // Verifica se o total de exercícios selecionados é igual ao total de exercícios cadastrados
//   if (exerciciosSelecionados.length === exerciciosDiaUsuario.length) {
//     console.log('Todos os exercícios já estão cadastrados. Nenhuma atualização necessária.');

//     return; // Sai da função, pois não há atualização necessária
//   } else {
//     // Identifica os exercícios faltantes que precisam ser adicionados
//     const exerciciosFaltantes = exerciciosSelecionados.filter((exercicioSelecionado: any) => {
//       // Verifica se o exercício selecionado não está no array de exercícios do usuário para o dia
//       return !exerciciosDiaUsuario.some((exercicioUsuario: any) => exercicioUsuario.id === exercicioSelecionado.id);
//     });

//     if (exerciciosFaltantes.length > 0) {
//       // Atualiza somente os exercícios faltantes que foram selecionados
//       console.log('Exercícios faltantes que serão adicionados:', exerciciosFaltantes);
      
//       this.alunoService.adicionarExercicios(this.alunoId, this.dia, exerciciosFaltantes).subscribe(
//         (response) => {
//           console.log('Exercícios atualizados com sucesso:', response);
//           window.location.reload();
//         },
//         (error) => {
//           console.error('Erro ao atualizar exercícios:', error);
//         }
//       );
//     } else {
//       console.log('Nenhum novo exercício selecionado para adicionar.');
      
//     }
//   }
// }
atualizarExercicio() {
  // Filtra os exercícios selecionados
  const exerciciosSelecionados = this.exercicios.filter(exercicio => exercicio.selecionado);
  console.log("Verifica os exercicios selecionados:", exerciciosSelecionados);

  const exerciciosDiaUsuario = this.alunoData.exercicios[this.dia] || [];
  console.log('Exercicios do usuario do dia: ', exerciciosDiaUsuario);

  console.log('Comprimento do array selecionado: ', exerciciosSelecionados.length);
  console.log('Comprimento do array do usuário: ', exerciciosDiaUsuario.length);

  // Verifica se o número de exercícios selecionados é menor ou maior que o do usuário
  if (exerciciosSelecionados.length < exerciciosDiaUsuario.length) {
    console.log('Número de exercícios selecionados é menor que os do usuário. Atualizando para a nova lista.');
    // Atualiza o JSON com os exercícios selecionados
    this.alunoService.atualizarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
        console.log('Exercícios atualizados com sucesso:', response);
        // window.location.reload();
      },
      (error) => {
        console.error('Erro ao atualizar exercícios:', error);
      }
    );
  } else if (exerciciosSelecionados.length > exerciciosDiaUsuario.length) {
    console.log('Número de exercícios selecionados é maior que os do usuário. Atualizando para a nova lista.');
    // Atualiza o JSON com os exercícios selecionados
    this.alunoService.atualizarExercicios(this.alunoId, this.dia, exerciciosSelecionados).subscribe(
      (response) => {
        console.log('Exercícios atualizados com sucesso:', response);
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


















