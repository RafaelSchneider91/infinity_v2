import { Component, OnInit } from '@angular/core';
import { InstrutorService } from 'src/app/services/instrutor/instrutor.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.page.html',
  styleUrls: ['./exercicios.page.scss'],
})
export class ExerciciosPage implements OnInit {

  exercicios: any[] = [];
  
  constructor(private instrutorService: InstrutorService) {}

  ngOnInit() {
    this.listarExercicios()
  }

  adicionarExercicio() {
    // Lógica para adicionar um novo exercício
    console.log('Adicionar novo exercício');
  }

  // Funcao para listar todos os exercicios
  listarExercicios() {
    this.instrutorService.listarExercicios().subscribe(
      (data) => {
        this.exercicios = data; // Armazena os exercícios recebidos
        console.log('Exercícios carregados:', this.exercicios);
      },
      (error) => {
        console.error('Erro ao carregar os exercícios:', error);
      }
    );
    
  }

}
