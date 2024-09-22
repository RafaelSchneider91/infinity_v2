import { Injectable } from '@angular/core';
// import { Treino } from '../../models/treino.model'
import { Exercicio } from 'src/app/models/exercicio.model';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {
  associarTreino(alunoId: string, exercicios: Exercicio[]) {
    // Lógica para associar treino ao aluno
  }

  listarTreinosPorAluno(alunoId: string) {
    // Retorna os treinos de um aluno
  }
}
