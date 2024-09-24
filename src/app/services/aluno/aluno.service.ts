import { Injectable } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:3001/api/usuariofinal';  // URL da API

  constructor(private http: HttpClient){}

 
   // Função para buscar todos os usuários cadastrados
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   // Função para buscar aluno por ID
   getAlunoById(alunoId: string) {
    return this.http.get(`${this.apiUrl}/${alunoId}`);
  }

  // Função para buscar os exercícios de um aluno por ID e dia
  getExerciciosPorDia(alunoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${alunoId}/exercicios`).pipe(
        tap(response => console.log('Resposta da API:', response)) // Log da resposta
    );
}

  // Função para cadastrar o aluno via POST
  cadastrarAluno(aluno: Aluno): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // console.log('Enviando aluno para a API:', aluno); // Log para verificar o que está sendo enviado
    console.log('API URL:', this.apiUrl); // Log para verificar se a URL da API está correta
  
    // Envia o aluno via POST para o servidor
    return this.http.post<any>(this.apiUrl, aluno, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao enviar aluno:', error); // Verifique o erro
        return throwError(error); // Lança o erro novamente para ser tratado onde a função é chamada
      })
    );
  }


adicionarExercicios(alunoId: string, dia: string, exercicios: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${alunoId}/exercicios`, { dia, exercicios });
}


atualizarExercicios(alunoId: string, dia: string, exercicios: any[]): Observable<any> {
  const body = {
      exercicios: {
          [dia]: exercicios // Cria uma propriedade do dia com a lista de exercícios
      }
  };

  console.log(body)
  return this.http.put(`${this.apiUrl}/${alunoId}`, body); // Utilize PUT para atualizar
}





  


}
