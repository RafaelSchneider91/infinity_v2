import { Exercicio } from './exercicio.model';


export interface Treino {
    alunoId: string;
    exercicios: Exercicio[];
    data: Date;
  }
  