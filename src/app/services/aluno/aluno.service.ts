import { Injectable } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:3001/api/usuariofinal';  // URL da API

  private alunos: Aluno[] = [];

  constructor(private http: HttpClient){}

   // Função para buscar todos os usuários cadastrados
  getUsuarios(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl);
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


  listarAlunos() {
    // Retornar lista de alunos cadastrados
  }
}
