import { Injectable } from '@angular/core';
import { Instrutor } from '../../models/instrutor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrutorService {
  private instrutores: Instrutor[] = [];
  private apiUrlExercicios = 'http://localhost:3001/api/exercicio';  // URL da API

  constructor(private http: HttpClient){}

  // Função para tratar erros
  private handleError(error: any) {
    console.error('Erro na API', error);
    return throwError(() => new Error('Erro ao conectar com a API'));
  }

  // Função para buscar todos os exercicios cadastrados
  listarExercicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlExercicios);
  }
  

  // Função para adicionar um novo exercício
  adicionarExercicio(exercicio: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrlExercicios, exercicio, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Funcao para adicionar um novo instrutor
  adicionarInstrutor(instrutor: Instrutor) {
    // Lógica para salvar instrutor
  }

  // Função para buscar todos os instrutores cadastrados
  deletarInstrutor() {
    // Retornar lista de instrutores
  }

  
}
