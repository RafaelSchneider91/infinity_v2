import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InstrutorService } from 'src/app/services/instrutor/instrutor.service';
import { DetalharexercicioComponent } from './detalharexercicio/detalharexercicio.component';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.page.html',
  styleUrls: ['./exercicios.page.scss'],
})
export class ExerciciosPage implements OnInit {

  exercicios: any[] = [];
  
  constructor(
    private instrutorService: InstrutorService,
    private modalController: ModalController
  ) {}

  // Executa sempre que a página entra em exibição
  ionViewWillEnter() {
    this.carregarExercicios();
  }

  // Função para carregar os exercícios
  carregarExercicios() {
    this.instrutorService.listarExercicios().subscribe(data => {
      this.exercicios = data;
    }, error => {
      console.error('Erro ao carregar exercícios:', error);
    });
  }

  async openModal(exercicio: any) {
    const modal = await this.modalController.create({
      component: DetalharexercicioComponent,
      componentProps: { exercicio } // Passa o exercício como propriedade
    });
    return await modal.present();
  }

  

  ngOnInit() {
    ''
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
