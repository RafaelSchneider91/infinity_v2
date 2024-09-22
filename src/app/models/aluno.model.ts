export interface Aluno {
    id?: string;                   // O "?" indica que o campo é opcional
    nome: string;
    email: string;
    peso: number;
    altura: number;
    dataNascimento: Date;
    // objetivo: string;
    diasTreino: string[];
  }
  